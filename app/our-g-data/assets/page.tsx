import React from 'react';
import Container from '@/components/UI/Containers';
import dynamic from 'next/dynamic';
const Main = dynamic(() => import('@/components/screens/OurGdata/Assets'))

export default function Assets() {
  return (
    <Container type="main" className="p-12 mobile:p-2 rounded-r-lg">
      <Main />
    </Container>
  );
}
