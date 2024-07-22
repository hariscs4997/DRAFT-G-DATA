'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeProvider';
import { Theme } from '@/types';

function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="https://www.g-datalabs.com/" className="flex flex-row gap-x-3 items-center mt-[0.5rem] md:mt-0">
      <div className="relative w-[50px] h-[50px] laptop:w-[40px] laptop:h-[40px]">
        {theme === Theme.LIGHT ? (
          <Image unoptimized src="/images/logo.png" alt="logo" fill className="object-contain " />
        ) : (
          <Image unoptimized src="/images/logo-dark.png" alt="logo" fill className="object-contain " />
        )}
      </div>
      <h3 className="text-[#575757] font-sans laptop:text-2xl text-3xl font-bold dark:text-primary">G-DataLabs</h3>
    </Link>
  );
}

export default Logo;
