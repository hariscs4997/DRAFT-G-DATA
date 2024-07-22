/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import Image from '@/components/UI/StyledImage';
import { upload } from '@/public/assets';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  noOfFiles: number;
}

function FileInput({ onChange, noOfFiles }: IProps) {
  return (
    <div className="flex flex-row w-full max-w-[450px] items-center bg-chat dark:bg-darkChat gap-x-5 relative py-[9px] px-4 ">
      <Image src={upload} alt="upload-icon" className="w-[36px] h-[36px] dark:invert" />
      <p className="text-black dark:text-main text-xl font-sans font-normal ">
        {noOfFiles > 0 ? `${noOfFiles} files selected` : 'Select files'}
      </p>
      <input
        onChange={onChange}
        name="profile"
        id="profile"
        multiple
        type="file"
        accept=".jpg, .jpeg, .png"
        className="w-full h-full opacity-0 absolute z-1 cursor-pointer"
      />
    </div>
  );
}
export default FileInput;
