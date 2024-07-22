/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import Image from '@/components/UI/StyledImage';
import { default_profile, upload } from '@/public/assets';

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profile: string;
}

function UploadPicture({ handleChange, profile }: IProps) {
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <label className="text-base font-bold font-sans text-black dark:text-main" htmlFor="profile">
        Upload Picture
      </label>
      <div className="flex flex-row w-full max-w-[450px] items-center bg-chat dark:bg-darkChat gap-x-5 relative py-[9px] px-4 ">
        <Image
          src={profile.length === 0 ? default_profile : profile}
          alt="profile"
          className="w-[50px] h-[50px]"
          rounded
        />
        <Image src={upload} alt="upload-icon" className="w-[36px] h-[36px]  dark:invert" />
        <p className="text-black text-xl dark:text-main font-sans font-normal">Upload Picture</p>
        <input
          onChange={handleChange}
          name="profile"
          id="profile"
          type="file"
          accept=".jpg, .jpeg, .png"
          className="w-full h-full opacity-0 absolute z-1 cursor-pointer"
        />
      </div>
      {/* {error && <p className="font-sans text-sm text-error -mt-2">{error}</p>} */}
    </div>
  );
}
export default UploadPicture;
