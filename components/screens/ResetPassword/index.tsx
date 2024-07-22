'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Form from './Form';

function Main() {
  const { resetPassword, isLoading } = useAuth();
  return (
    <div className="absolute-center w-full max-w-[450px] overflow-y-auto">
      <h1 className="text-3xl font-sans font-bold text-primary mb-5">Forgot Password</h1>
      <Form resetPassword={resetPassword} isLoading={isLoading} />
    </div>
  );
}
export default Main;
