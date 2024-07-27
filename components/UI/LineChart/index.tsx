'use client';

// @ts-ignore
import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

export default function Main({ data, layout }: any) {

  return (
    <Plot data={data} layout={layout} config={{}} />
  );
}
