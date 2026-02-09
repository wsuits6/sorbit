import React from 'react';
import Layout from './Layout';
import MobileLayout from './MobileLayout';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const DESKTOP_QUERY = '(min-width: 1025px)';

const ResponsiveLayout = ({ user, navigationItems }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return isDesktop ? (
    <Layout user={user} navigationItems={navigationItems} />
  ) : (
    <MobileLayout user={user} />
  );
};

export default ResponsiveLayout;
