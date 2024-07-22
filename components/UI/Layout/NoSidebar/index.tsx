import React from 'react';

interface IProps {
  children: React.ReactNode;
}
function NoSidebarLayout({ children }: IProps) {
  return <div className="h-screen w-screen">{children}</div>;
}

export default NoSidebarLayout;
