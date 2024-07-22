'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';
// @ts-ignore
// eslint-disable-next-line no-continue
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
      color: 'red'
    }
  }] as Plotly.Data[];

  // const candlestickData = [
  //   {
  //     x: [
  //       '00:00',
  //       '01:00',
  //       '02:00',
  //       '03:00',
  //       '04:00',
  //       '05:00',
  //       '06:00',
  //       '07:00',
  //       '08:00',
  //       '09:00',
  //       '10:00',
  //       '11:00',
  //       '12:00',
  //       '13:00',
  //       '14:00',
  //       '15:00',
  //       '16:00',
  //       '17:00',
  //       '18:00',
  //       '19:00',
  //       '20:00',
  //       '21:00',
  //       '22:00',
  //       '23:00',
  //     ],
  //     open: [20, 40, 60, 80, 10, 30, 50, 70, 90, 10, 100, 30, 80, 10, 20, 30, 50, 90, 10, 60, 10, 1, 3, 40],
  //     high: [80, 90, 100, 40, 80, 90, 100, 40, 80, 90, 100, 40, 80, 90, 100, 40, 80, 90, 100, 40, 80, 90, 100, 40],
  //     low: [10, 30, 10, 20, 40, 30, 20, 11, 14, 23, 21, 16, 31, 21, 23, 43, 31, 23, 41, 18, 19, 29, 10, 5],
  //     close: [40, 60, 80, 10, 30, 50, 70, 90, 10, 100, 30, 80, 10, 20, 30, 50, 90, 10, 60, 10, 1, 3, 40, 25],
  //     type: 'candlestick',
  //     mode: 'lines',
  //     marker: {
  //       color: 'red',
  //     },
  //   },
  // ] as Plotly.Data[];

  return data?.length !== 0 ? <Plot data={candlestickData} layout={layout} config={chartConfig} /> : <Loader />;
}
