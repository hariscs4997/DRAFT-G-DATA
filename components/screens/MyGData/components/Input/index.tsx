/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions

'use client';

import React from 'react';
import Image from '@/components/UI/StyledImage';
import { edit } from '@/public/assets';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isMonetaryInput?: boolean;
  currency?: string;
  onclick?: () => void;
}
function Input({
  readOnly,
  name,
  onChange,
  value,
  type,
  pattern,
  className,
  currency = '$',
  isMonetaryInput = false,
  onclick,
}: IProps) {
  return (
    <div
      className={[
        'flex flex-row gap-x-5 items-center justify-center w-full relative max-w-[160px] mx-auto',
        className,
      ].join(' ')}
    >
      {isMonetaryInput && (
        <span className="absolute top-[23%] left-[19px] mobile:left-[15px] text-white font-sans text-xl font-medium">
          {currency}
        </span>
      )}
      <input
        autoComplete="off"
        pattern={pattern}
        name={name}
        readOnly={readOnly}
        id={name}
        type={type || 'number'}
        value={value}
        onChange={onChange}
        className="bg-chat dark:bg-[#727271] py-3 px-6 rounded-sm text-white font-sans font-medium text-xl focus:outline-none w-full max-w-[100px]"
      />
      <div onClick={onclick} role="presentation">
        <label htmlFor={name} className={`cursor-pointer ${readOnly && 'opacity-0 invisible'}`}>
          <Image src={edit} alt="edit-icon" className="w-[24px] h-[24px] dark:invert" />
        </label>
      </div>
    </div>
  );
}
export default Input;
