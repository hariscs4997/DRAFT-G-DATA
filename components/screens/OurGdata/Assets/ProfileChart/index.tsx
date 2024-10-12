import React, { memo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, LineElement, Tooltip, PointElement } from 'chart.js';
import { twMerge } from 'tailwind-merge';

interface IProps {
  data: any;
  className?: string;
}
ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, Title, Tooltip, PointElement, LineElement);

function LineChart({ data, className }: IProps) {
  const options = {
    color: 'white',
    plugins: {
      datalabels: {
        display: false,
      },
    },
    responsive: true,

    scales: {
      x: {
        display: false,
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
      borderColor: 'red',
    },
  ];

  const lineChartData = {
    labels: labels,
    datasets: dataArray,
  };

  return (
    <Line options={options} data={lineChartData} redraw={true} className={twMerge("w-full", className)} />
  );
}

export default memo(LineChart);