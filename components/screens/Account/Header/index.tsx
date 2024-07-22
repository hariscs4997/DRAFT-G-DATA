'use client';

import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from '@/components/UI/StyledImage';
import { useAuth } from '@/hooks/useAuth';
import { capitalize } from '@/lib';
import { maxWidth } from '@/constants';

function Header() {
  const { user } = useAuth();
  return (
    <div
      className={`bg-lightGreen dark:bg-dark flex flex-row items-center w-full pl-4 mobile:pl-2 py-6 rounded-md gap-x-4 max-w-[${maxWidth}]`}
    >
      {!user ? (
        <Skeleton circle width={50} height={50} containerClassName="avatar-skeleton" />
      ) : (
        <Image src={user.image} alt="profile" className="w-[50px] h-[50px] rounded-full" rounded />
      )}

      <div className="flex flex-col flex-1">
        {!user && (
          <>
            <Skeleton width={150} />
            <Skeleton width={190} />
          </>
        )}
        <h3 className="font-sans font-bold text-xl text-primary  dark:text-main leading-6">
          {user && capitalize(`${user.firstName} ${user.lastName}`)}
        </h3>
        <p className="font-sans font-normal text-primary dark:text-main text-base">{user && user.email}</p>
      </div>
    </div>
  );
}
export default memo(Header);
