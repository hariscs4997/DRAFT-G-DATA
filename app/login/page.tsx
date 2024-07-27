import React, { Suspense } from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/Login';
import Skeleton from 'react-loading-skeleton';

export default function Login() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Container type="main" className="relative">
        <Main />
      </Container>
    </Suspense>
  );
}
