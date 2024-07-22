import React from 'react';
import '@/styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import type { Metadata } from 'next';
import { DMSANS, RALEWAY } from '@/public/fonts';
import Layout from '@/components/UI/Layout';
import Toast from '@/components/UI/Notification';
import Provider from './provider';

export const metadata: Metadata = {
  title: 'G-DataLabs',
  description: 'Unlocking Possibilities: The AI Tool for Seamless Innovation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[DMSANS.variable, RALEWAY.variable].join(' ')}>
      <body className="bg-main dark:bg-darkMain">
        <Provider>
          <Toast />
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
