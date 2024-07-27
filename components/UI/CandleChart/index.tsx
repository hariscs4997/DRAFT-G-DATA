'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
});

export default function CandleChart({ data, layout }: any) {
  const chartConfig = {
    displayModeBar: false,
  };

  const candlestickData = [{
    x: data.map((d: { x: any; }) => d.x),
    open: data.map((d: { open: any; }) => d.open),
    high: data.map((d: { high: any; }) => d.high),
    low: data.map((d: { low: any; }) => d.low),
    close: data.map((d: { close: any; }) => d.close),
    type: 'candlestick',
    mode: 'lines',
    marker: {
      color: 'red',
    },
  }] as Plotly.Data[];



  return <Plot data={candlestickData} layout={layout} config={chartConfig} />;
}
