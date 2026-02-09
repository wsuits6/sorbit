import React from 'react';
import DashboardDesktop from './desktop/DashboardDesktop';
import DashboardMobile from './mobile/DashboardMobile';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const DESKTOP_QUERY = '(min-width: 1025px)';

const Dashboard = () => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return isDesktop ? <DashboardDesktop /> : <DashboardMobile />;
};

export default Dashboard;
