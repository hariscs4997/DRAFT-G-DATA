import React from 'react';
import { StaticImageData } from 'next/image';
import Image from '@/components/UI/StyledImage';
import Loader from '@/components/screens/Home/MainContent/ActiveChat/Loader';

interface IProps {
  children: React.ReactNode;
  isLoading?: boolean;
  profile: string | StaticImageData;
}
function Chat({ isLoading = false, children, profile }: IProps) {
  return (
    <div className="bg-chat flex flex-row gap-x-8 items-center justify-start py-5 pl-8 pr-[120px] font-raleway text-primary text-xl font-semibold mb-4 mobile:px-2 mobile:text-base relative dark:bg-darkChat dark:text-main">
      <Image src={profile} alt="profile" className="w-12 h-12 self-start min-w-[3rem]" rounded />
      <div>
        {isLoading && <Loader />}
        {children}
      </div>
    </div>
  );
}

export default Chat;
