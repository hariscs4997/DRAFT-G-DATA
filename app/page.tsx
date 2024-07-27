import React, { Suspense } from 'react';
import Main from '@/components/screens/Home';
import Skeleton from 'react-loading-skeleton';

export default function Home() {
  return <Suspense fallback={<Skeleton />}><Main /></Suspense>;
}
