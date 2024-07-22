import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Container from '@/components/UI/Containers';

export default function Loading() {
  return (
    <>
      <Container type="main" className="px-10 pt-10">
        <Skeleton width="90%" height={80} borderRadius={6} baseColor="#D9D9D9" count={4} className="mb-4" />
      </Container>
      <Container type="side" className="px-10 pt-10">
        <Skeleton width={150} className="my-10" />
        <Skeleton width={100} />
        <Skeleton width="90%" height={80} borderRadius={6} baseColor="#D9D9D9" count={6} className="my-4" />
      </Container>
    </>
  );
}
