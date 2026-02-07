import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../db.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const parseBody = (req, res, next) => {
  if (!req.is('application/json')) {
    return res.status(415).json({ message: 'Content-Type must be application/json' });
  }
  return next();
};

router.post('/register', parseBody, async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const db = await getDb();
  const normalizedEmail = email.toLowerCase();
  const existing = await db.get('SELECT id FROM users WHERE email = ?', normalizedEmail);
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const createdAt = new Date().toISOString();

  const result = await db.run(
    'INSERT INTO users (email, password_hash, name, created_at) VALUES (?, ?, ?, ?)',
    normalizedEmail,
    passwordHash,
    name || null,
    createdAt
  );

  const userId = result.lastID;
  const accessToken = signAccessToken({ sub: userId, email: normalizedEmail });
  const refreshToken = signRefreshToken({ sub: userId, email: normalizedEmail });
  const refreshPayload = jwt.decode(refreshToken);

  await db.run(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?)',
    userId,
    refreshToken,
    new Date(refreshPayload.exp * 1000).toISOString(),
    createdAt
  );

  return res.status(201).json({
    user: { id: userId, email: normalizedEmail, name: name || null },
    accessToken,
    refreshToken,
  });
});

router.post('/login', parseBody, async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const db = await getDb();
  const normalizedEmail = email.toLowerCase();
  const user = await db.get('SELECT id, email, password_hash, name FROM users WHERE email = ?', normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id, email: user.email });
  const refreshPayload = jwt.decode(refreshToken);
  const now = new Date().toISOString();

  await db.run(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?)',
    user.id,
    refreshToken,
    new Date(refreshPayload.exp * 1000).toISOString(),
    now
  );

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  });
});

router.post('/refresh', parseBody, async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }

  const db = await getDb();
  const stored = await db.get(
    'SELECT id, user_id, token, expires_at, revoked FROM refresh_tokens WHERE token = ?',
    refreshToken
  );

  if (!stored || stored.revoked) {
    return res.status(401).json({ message: 'Refresh token not recognized' });
  }

  const accessToken = signAccessToken({ sub: payload.sub, email: payload.email });
  const newRefreshToken = signRefreshToken({ sub: payload.sub, email: payload.email });
  const refreshPayload = jwt.decode(newRefreshToken);
  const now = new Date().toISOString();

  await db.run('UPDATE refresh_tokens SET revoked = 1 WHERE id = ?', stored.id);
  await db.run(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?)',
    stored.user_id,
    newRefreshToken,
    new Date(refreshPayload.exp * 1000).toISOString(),
    now
  );

  return res.json({ accessToken, refreshToken: newRefreshToken });
});

router.post('/logout', parseBody, async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const db = await getDb();
  await db.run('UPDATE refresh_tokens SET revoked = 1 WHERE token = ?', refreshToken);
  return res.json({ success: true });
});

router.get('/me', requireAuth, async (req, res) => {
  const db = await getDb();
  const user = await db.get('SELECT id, email, name, created_at FROM users WHERE id = ?', req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json({ user });
});

export default router;
