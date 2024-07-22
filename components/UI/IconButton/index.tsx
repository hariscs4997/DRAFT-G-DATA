/* eslint-disable react/button-has-type */

'use client';

import React from 'react';
import { StaticImageData } from 'next/image';
import Image from '@/components/UI/StyledImage';
import Loader from '@/components/UI/Loader';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
  src: StaticImageData | string;
  children?: React.ReactNode;
}
function IconButton({ children, onClick, type = 'button', isLoading = false, src, className = '', disabled }: IProps) {
  return (
    <button
      className={['disabled:cursor-not-allowed', className].join(' ')}
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Loader
          style={{
            color: '#fff',
            margin: '0 auto',
          }}
          className='h-5 w-5'
        />
      ) : (
        <Image src={src} alt="button-icon" className=" h-full w-full" />
      )}
      {children}
    </button>
  );
}
export default IconButton;
