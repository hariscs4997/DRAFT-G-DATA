/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import Image from '@/components/UI/StyledImage';
import { edit } from '@/public/assets';

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
function Textarea({ readOnly, name, onChange, value, className }: IProps) {
  return (
    <div
      className={[
        'flex flex-row gap-x-5 items-center justify-center w-full relative max-w-[200px] mx-auto',
        className,
      ].join(' ')}
    >
      <textarea
        autoComplete="off"
        onChange={onChange}
        name={name}
        readOnly={readOnly}
        id={name}
        value={value}
        cols={5}
        className="bg-chat dark:bg-[#727271] py-3 px-6 rounded-sm text-white font-sans font-medium text-xl focus:outline-none w-full max-w-[140px] resize-none"
      />
      <label htmlFor={name} className={`cursor-pointer ${readOnly && 'opacity-0 invisible'}`}>
        <Image src={edit} alt="edit-icon" className="w-[24px] h-[24px] dark:invert" />
      </label>
    </div>
  );
}
export default Textarea;
