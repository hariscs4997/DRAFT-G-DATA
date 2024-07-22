/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState } from 'react';
import { bulb_active, bulb_inactive } from '@/public/assets';
import { useTheme } from '@/context/ThemeProvider';
import { Theme } from 'types';
import Image from '@/components/UI/StyledImage';

interface IProps {
  className?: string;
}

function Switch({ className = '' }: IProps) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState<boolean>(theme !== Theme.DARK);

  const handleChange = () => {
    if (checked) setTheme(Theme.DARK);
    else setTheme(Theme.LIGHT);
    setChecked(!checked);
  };

  return (
    <>
      <input type="checkbox" id="switch" className="hidden" onChange={handleChange} />
      <div className={['bg-gray rounded-md py-3 px-4 w-full ] dark:bg-[#888888]', className].join(' ')}>
        <label htmlFor="switch" className="flex gap-x-3 items-center cursor-pointer justify-center">
          <div
            className={`flex gap-x-4 items-center transition-all ease-in-out duration-200 rounded-md py-2 px-4 ${
              checked ? 'bg-dark dark:bg-darkActive' : 'bg-transparent'
            } `}
          >
            <Image
              src={checked ? bulb_active : bulb_inactive}
              alt="light-bulb-icon"
              className="h-5 w-4 dark:invert-1"
            />
            <span
              className={`font-sans font-bold text-base dark:text-white ${checked ? 'text-active ' : 'text-inactive '}`}
            >
              Light
            </span>
          </div>
          <div
            className={`flex gap-x-4 items-center transition-all ease-in-out duration-200 rounded-md py-2 px-4 ${
              !checked ? 'bg-dark dark:bg-darkActive' : 'bg-transparent'
            } `}
          >
            <Image
              src={checked ? bulb_inactive : bulb_active}
              alt="light-bulb-icon"
              className="h-5 w-5 dark:invert-1"
            />
            <span
              className={`font-sans font-bold text-base  ${
                !checked ? 'text-active dark:text-white' : 'text-inactive dark:text-white'
              }`}
            >
              Dark
            </span>
          </div>
        </label>
      </div>
    </>
  );
}

export default Switch;
