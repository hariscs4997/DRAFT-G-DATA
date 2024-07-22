'use client';

import React from 'react';
import { cross_disable, cross_active, check_active, check_disable } from '@/public/assets';
import IconButton from '@/components/UI/IconButton';

type TProps = {
  isAllowed: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};
function Actions({ isAllowed, onClick, isDisabled }: TProps) {
  return (
    <div className="flex flex-row gap-x-4 mobile:gap-x-2 w-full justify-center items-center">
      <IconButton
        src={isAllowed && !isDisabled ? check_active : check_disable}
        disabled={isDisabled}
        className={`relative h-[35px] w-[35px] mobile:w-[25px] mobile:h-[25px] ${isDisabled && 'cursor-default'}`}
        onClick={() => {
          if (!isAllowed && !isDisabled) onClick();
        }}
      />
      <IconButton
        src={!isAllowed && !isDisabled ? cross_active : cross_disable}
        disabled={isDisabled}
        className={`relative h-[35px] w-[35px] mobile:w-[25px] mobile:h-[25px] ${isDisabled && 'cursor-default'}`}
        onClick={() => {
          if (isAllowed && !isDisabled) onClick();
        }}
      />
    </div>
  );
}

export default Actions;
