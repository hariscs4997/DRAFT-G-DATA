'use client';

import React from 'react';
import MainLayout from './Main';

interface IProps {
  children: React.ReactNode;
}
function Layout({ children }: IProps) {
  return <MainLayout>{children}</MainLayout>;
}

export default Layout;
