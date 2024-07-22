'use client';

import React from 'react';
import { useMyGData } from '@/hooks/useMyGData';
import { maxWidth } from '@/constants';
import Accordion from './Accordion';

function Main() {
  const { screenData } = useMyGData();
  return (
    <>
      <h1
        className={`border-table border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap text-center max-w-[${maxWidth}]`}
      >
        Screen Data
      </h1>
      <div className={`max-w-[${maxWidth}] overflow-x-auto w-full h-full pb-5`}>
        {screenData.map((item) => (
          <Accordion data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
export default Main;
