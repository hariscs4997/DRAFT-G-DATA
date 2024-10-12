import React from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/OurGdata/Data/Sell';
export const runtime = 'edge';

export default function Consent({ params }: { params: { slug: string } }) {
  return (
    <Container type="main" className="p-12 mobile:p-2 rounded-r-lg">
      <Main slug={params.slug} />
    </Container>
  );
}