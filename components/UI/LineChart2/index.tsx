/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-boolean-value */

import React, { memo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { ChartData } from '@/types';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, LineElement, Tooltip, PointElement } from 'chart.js';

interface IProps {
  data: ChartData;
  className?: string;
  color: string;
}
ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, Title, Tooltip, PointElement, LineElement);

export function LineChart({ data, className, color }: IProps) {
  const options = {
    color: 'white',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false, // Hide data values on the lines
      },
    },
    responsive: true,

    scales: {
      x: {
        display: false, // Hide X-axis labels
      },

      y: {
        display: false,
      },
    },
  };
  const labels = Object.keys(data);
  const dataArray = [
    {
      data: Object.values(data),
      borderColor: color,
      pointHoverRadius: 0,
      pointRadius: 0,
    },
  ];

  const lineChartData = {
    labels: labels,
    datasets: dataArray,
  };

  return (
    <div className={className}>
      <Line options={options} data={lineChartData} redraw={true} className="w-[100px] max-h-[120px] ml-4" />
    </div>
  );
}

export default memo(LineChart);
