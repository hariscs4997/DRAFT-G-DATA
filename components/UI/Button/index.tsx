/* eslint-disable react/button-has-type */

'use client';

import React from 'react';
import { StaticImageData } from 'next/image';
import Image from '@/components/UI/StyledImage';
import Loader from '@/components/UI/Loader';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: StaticImageData;
  isLoading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
function Button({ onClick, type = 'button', title, isLoading = false, icon, className = '', style }: IProps) {
  return (
    <button
      className={[
        'text-xl text-center font-sans font-bold text-white py-3 rounded-md relative  disabled:cursor-not-allowed',
        className,
      ].join(' ')}
      onClick={onClick}
      type={type}
      style={style}
      disabled={isLoading}
    >
      {icon && !isLoading && (
        <div className="absolute left-[9%] top-1/2 -translate-y-1/2">
          <Image src={icon} alt="icon" className="h-[35px] w-[35px]" />
        </div>
      )}
      {isLoading ? (
        <Loader
          style={{
            color: '#fff',
            margin: '0 auto',
          }}
          className='h-5 w-5'
        />
      ) : (
        title
      )}
    </button>
  );
}
export default Button;
