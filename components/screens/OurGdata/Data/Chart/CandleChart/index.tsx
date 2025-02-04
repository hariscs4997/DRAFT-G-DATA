'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeProvider';
// @ts-ignore
// eslint-disable-next-line no-continue
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

interface IProps {
  data: any
}
export default function CandleChart({ data }: IProps) {

  const { theme } = useTheme()

  return <Plot
    data={[{
      ...data,
      decreasing: { line: { color: '#F24C29' } },
      increasing: { line: { color: '#76C655' } },
      type: 'candlestick',
    }]}
    layout={
      {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 40,
          l: 60
        },
        showlegend: false,
        width: 640,
        height: 450,
        plot_bgcolor: theme === 'dark' ? '#454545' : '#fff',
        paper_bgcolor: theme === 'dark' ? '#454545' : '#fff',
        xaxis: {
          autorange: true,
          domain: [0, 1],
          title: 'Timeframe',
          type: 'date',
          color: theme === 'light' ? '#000' : '#D9D9D9'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          type: "linear",
          color: theme === 'light' ? '#000' : '#D9D9D9'
        }
      }
    }
  />;
}