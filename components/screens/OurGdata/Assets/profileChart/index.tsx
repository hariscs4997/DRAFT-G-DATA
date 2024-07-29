'use client';

import React, { memo, useMemo } from 'react';
import LineChart from '@/components/UI/LineChart';
import { PROFILECART } from '@/temp';
import { useTheme } from '@/context/ThemeProvider';

interface IProps {
  data: any
}

function ProfileChart({ data }: IProps) {
  const { theme } = useTheme()

  const CHARTLAYOUT = useMemo(() => {
    const plotColor = theme === 'dark' ? '#454545' : '#D9D9D9';
    const axisColor = theme === 'light' ? '#454545' : '#D9D9D9';
    return {
      xaxis: {
        title: 'Time Frame',
        type: 'category',
        tickmode: 'linear',
        color: axisColor,
      },
      yaxis: { title: 'Y-axis', color: axisColor },
      plot_bgcolor: plotColor,
      paper_bgcolor: plotColor,
      responsive: true,
    };
  }, [theme]);

  return <LineChart data={data} layout={CHARTLAYOUT} />
}


export default memo(ProfileChart); 
