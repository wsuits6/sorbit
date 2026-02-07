import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../services/auth';

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = 'authAccessToken';
const REFRESH_TOKEN_KEY = 'authRefreshToken';

const getStoredTokens = () => ({
  accessToken: sessionStorage.getItem(ACCESS_TOKEN_KEY),
  refreshToken: sessionStorage.getItem(REFRESH_TOKEN_KEY),
});

const storeTokens = ({ accessToken, refreshToken }) => {
  if (accessToken) sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const clearTokens = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { accessToken } = getStoredTokens();
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const data = await authApi.me();
        setUser(data.user || null);
      } catch (err) {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    storeTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setUser(data.user || null);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authApi.register({ name, email, password });
    storeTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setUser(data.user || null);
    return data;
  };

  const logout = async () => {
    const { refreshToken } = getStoredTokens();
    if (refreshToken) {
      try {
        await authApi.logout({ refreshToken });
      } catch (err) {
        // ignore network failures on logout
      }
    }
    clearTokens();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
