'use client';

import React, { useEffect } from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/OurGdata/Data/Sell';
import { useApp } from '@/context/AppProvider';

export default function Consent() {
  return (
    <Container type="main" className="p-12 mobile:p-2 rounded-r-lg">
      <Main />
    </Container>
  );
}
