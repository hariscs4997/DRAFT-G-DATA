import React from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/MyGData';

export default function MyGData() {
  return (
    <Container type="main" className="p-8 mobile:p-2 rounded-r-lg">
      <Main />
    </Container>
  );
}
