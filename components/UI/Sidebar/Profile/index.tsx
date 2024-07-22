'use client';

import React from 'react';
import Image from '@/components/UI/StyledImage';
import { logout } from '@/public/assets';
import { UserType } from '@/state/user/types';
import { capitalize } from '@/lib';

type TProps = {
  logoutUser: () => void;
  user: UserType;
};

function Profile({ logoutUser, user }: TProps) {
  return (
    <div className="mb-2 bg-gray flex flex-row items-center w-full pl-4 pr-6 py-3 rounded-md gap-x-4 dark:bg-darkActive">
      <Image src={user.image} alt="profile" className="w-[50px] h-[50px] rounded-full" rounded />
      <div className="flex flex-col flex-1">
        <h3 className="font-sans font-bold text-xl text-active  leading-6  max-w-[140px] truncate">
          {capitalize(`${user.firstName} ${user.lastName}`)}
        </h3>
        <p className="font-sans font-normal text-active text-base max-w-[140px] truncate">{user.email}</p>
      </div>
      <button type="submit" className="bg-transparent focus:outline-none focus:shadow-none" onClick={logoutUser}>
        <Image src={logout} alt="logout" className="w-[35px] h-[35px]" />
      </button>
    </div>
  );
}

export default Profile;
