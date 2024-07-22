'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ACCOUNTTYPE } from '@/constants/auth';
import { PATHS } from '@/constants/navigation';
import { APPITEMS, AUTHITEMS } from '@/constants/sidebar';
import { useWindowSize } from '@/hooks/useWindowSize';
import { sidebar_icon_dark } from '@/public/assets';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/state/sidebar/hooks';
import { NAVITEMS } from '@/types';
import Logo from './Logo';
import Items from './Items';
import Switch from './Switch';
import Profile from './Profile';
import IconButton from '../IconButton';

function Sidebar() {
  const { width } = useWindowSize();
  const { isOpen, setIsOpen } = useSidebar();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isAuthenticated, logoutUser, user } = useAuth();
  const handleOutsideClick = () => {
    setIsOpen(false);
  };
  useOutsideClick(containerRef, handleOutsideClick);
  const navItems: NAVITEMS[] = useMemo(() => {
    if (!isAuthenticated || !user) return AUTHITEMS;
    if (user.accountType === ACCOUNTTYPE.COMPANY)
      return APPITEMS.map((item) => {
        if (item.to === PATHS.MYGDATA && item.nestedItems) {
          return {
            ...item,
            nestedItems: [
              ...item.nestedItems,
              {
                title: 'Company',
                icon: '',
                to: PATHS.COMPANY,
              },
            ],
          };
        }
        return item;
      });
    return APPITEMS;
  }, [isAuthenticated, user]);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  return (
    <>
      {width < 1280 && (
        <div className="h-[calc(100vh_-_2.5rem)] bg-[#f1e6d9] dark:bg-transparent relative w-[50px]">
          <IconButton
            className="absolute top-2 left-2 flex items-center justify-center w-[30px] h-[30px] dark:invert-[1]"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            src={sidebar_icon_dark}
          />
        </div>
      )}

      <aside
        ref={containerRef}
        className={`h-[calc(100vh_-_2.5rem)] flex flex-col gap-y-4 max-w-[360px] mobile:max-w-full items-start justify-between overflow-y-auto ${
          width < 1280
            ? `fixed z-20 transition-all duration-300 bg-light dark:bg-[#9f9f9e] ${isOpen ? 'w-full  pl-5' : 'w-0 p-0'}`
            : ' pl-5 w-[25%] bg-transparent'
        }
     `}
      >
        <Logo />
        {width < 1280 && (
          <IconButton
            className="z-10 absolute top-3 right-2 flex items-center justify-center w-[30px] h-[30px] dark:invert-[1]"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            src={sidebar_icon_dark}
          />
        )}
        <Items items={navItems} />
        <div className="max-w-sidebarItem w-full">
          {isAuthenticated && user && <Profile logoutUser={logoutUser} user={user} />}
          <Switch />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
