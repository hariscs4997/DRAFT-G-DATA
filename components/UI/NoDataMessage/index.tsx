import React, { useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import Image from '@/components/UI/StyledImage';
import { no_data } from '@/public/assets';

type TProps = {
  message?: string;
  icon?: StaticImageData;
  isParentFixed?: boolean;
};
function NoData({ message = undefined, icon = undefined, isParentFixed }: TProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isParentFixed) return;
    if (!messageContainerRef) return;
    if (!messageContainerRef.current) return;
    if (!messageContainerRef.current.parentElement) return;
    messageContainerRef.current.parentElement.classList.add('relative');
  }, [isParentFixed]);
  return (
    <div
      className={`flex flex-col gap-y-3 dark:text-main ${
        !isParentFixed && 'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
      } items-center`}
      ref={messageContainerRef}
    >
      <Image
        src={icon ?? no_data}
        alt="no-data"
        className="w-14 h-14 object-contain dark:filter-invert(1) dark:brightness-200"
      />
      <p className="font-sans font-semibold text-primary dark:text-main text-xl text-center">
        {message ?? 'No data to display'}
      </p>
    </div>
  );
}

export default NoData;
