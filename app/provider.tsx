// Providers.jsx

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from '@/state/store';

import ThemeProvider from '@/context/ThemeProvider';
import AppProvider from '@/context/AppProvider';
import { PersistGate } from 'redux-persist/integration/react';

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AppProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppProvider>
      </PersistGate>
    </Provider>
  );
}
