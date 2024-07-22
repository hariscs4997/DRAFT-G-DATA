'use client';

import React from 'react';
import { LineChart } from '@/components/UI/LineChart2';
import { PROFILECART } from '@/temp';

export default function ProfileChart() {
  return <LineChart data={PROFILECART} color="red" />;
}
