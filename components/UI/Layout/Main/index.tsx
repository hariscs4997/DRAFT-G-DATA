import React from 'react';
import Sidebar from '@/components/UI/Sidebar';

interface IProps {
  children: React.ReactNode;
}
function MainLayout({ children }: IProps) {
  return (
    <div className="h-screen w-screen flex bg-[#f1e6d9] dark:bg-[#b6b6b5] flex-row py-5 pr-5">
      <Sidebar />
      {children}
    </div>
  );
}

export default MainLayout;
