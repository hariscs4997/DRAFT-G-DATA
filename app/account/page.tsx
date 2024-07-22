import React from 'react';
import Container from '@/components/UI/Containers';
import Header from '@/components/screens/Account/Header';
import PersonalInformation from '@/components/screens/Account/PersonalInformation';

export default function Account() {
  return (
    <Container type="main" className="py-12 px-10 mobile:py-4 mobile:px-2 rounded-r-lg">
      <Header />
      <PersonalInformation />
    </Container>
  );
}
