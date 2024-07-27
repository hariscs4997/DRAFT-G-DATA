'use client';

import React, { memo } from 'react';
import { LineChart } from '@/components/UI/LineChart2';
import { PROFILECART } from '@/temp';

function ProfileChart() { return <LineChart data={PROFILECART} color="red" />; }


export default memo(ProfileChart); 
