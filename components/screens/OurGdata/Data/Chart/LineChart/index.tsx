'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeProvider';


const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

interface IProps {
  data: any
}

export default function LineChart({ data }: IProps) {
  const { theme } = useTheme()
  return (
    <Plot data={[
      { ...data, type: "scatter" }
    ]} layout={{
      width: 640,
      height: 450,
      plot_bgcolor: theme === 'dark' ? '#454545' : '#fff',
      paper_bgcolor: theme === 'dark' ? '#454545' : '#fff',
      xaxis: {
        color: theme === 'light' ? '#000' : '#D9D9D9'
      },
      yaxis: {
        color: theme === 'light' ? '#000' : '#D9D9D9'
      }
    }} />
  );
}