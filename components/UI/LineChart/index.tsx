'use client';

// @ts-ignore
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../LazyLoader';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

export default function Main({ data, layout }: any) {
  const chartConfig = {};

  const [lazyLoader, setLazyLoader] = useState(false);

  useEffect(() => {
    if (data) {
      // Wait for a short period to show the loader for a better user experience
      const timer = setTimeout(() => {
        setLazyLoader(true);
      }, 2000); // Adjust this timeout based on your needs

      // Cleanup timer
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className='max-w-full mt-16'>
    
        <Plot data={data} layout={layout} config={chartConfig} />
     
    </div>
  );
}
