import React, { Suspense } from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/History';
import Skeleton from 'react-loading-skeleton';

export default function History() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Container type="main" className="p-8 mobile:p-2 rounded-r-lg ">
        <Main />
      </Container>
    </Suspense>
  );
}
