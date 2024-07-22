import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Container from '@/components/UI/Containers';

export default function Loading() {
  return (
    <Container type="main" className="py-12 px-10 mobile:py-4 mobile:px-2 rounded-r-lg">
      <div className="bg-lightGreen dark:bg-dark flex flex-row items-center w-full pl-4 mobile:pl-2 py-6 rounded-md gap-x-4">
        <Skeleton circle width={50} height={50} containerClassName="avatar-skeleton" />
        <div className="flex flex-col flex-1">
          <Skeleton width={150} />
          <Skeleton width={190} />
        </div>
      </div>
      <div className="mt-4 bg-lightGreen dark:bg-dark w-full pl-12 pr-8 py-7 mobile:px-2  rounded-md h-[calc(100%_-_6rem)] overflow-y-auto">
        <Skeleton width={190} />
      </div>
    </Container>
  );
}
