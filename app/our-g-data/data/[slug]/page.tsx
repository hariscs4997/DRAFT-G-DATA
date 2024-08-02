import React from 'react';
import Container from '@/components/UI/Containers';
import Main from '@/components/screens/OurGdata/Data/Chart';
import { slugify } from '@/lib';

export default function Consent({ params }: { params: { slug: string } }) {
  return (
    <Container type="main" className="p-12 mobile:p-2 rounded-r-lg">
      <Main slug={params.slug} />
    </Container>
  );
}
// export async function generateStaticParams() {
//   const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"

//   const response = await fetch(`${baseUrl}/api/fetch-consent-names`);
//   const { data } = await response.json();

//   if (!response.ok) {
//     throw new Error('Failed to fetch consent data');
//   }
//   return data.map((item: any) => ({
//     slug: slugify(item.field_name)
//   }));
// }