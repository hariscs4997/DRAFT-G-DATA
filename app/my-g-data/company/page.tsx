import React from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/MyGData/Company';

export default function Company() {
  return (
    <Container type="main" className="p-12 mobile:p-2 rounded-r-lg">
      <Main />
    </Container>
  );
}
