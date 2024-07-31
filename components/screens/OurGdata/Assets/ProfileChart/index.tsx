'use client';

import React, { memo } from 'react';
import LineChart from '@/components/UI/LineChart/ChartJsLineChart';

interface IProps {
  data: any
}

function ProfileChart({ data }: IProps) {
  return <LineChart data={data} color="red" />;
}


export default memo(ProfileChart); 
