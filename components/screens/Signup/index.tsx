'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import SignupForm from './Form';

function Main() {
  const { registerUser, isLoading } = useAuth();

  return (
    <div className="w-full py-2  max-w-[950px] mx-auto mt-10">
      <h1 className="text-3xl font-sans font-bold text-primary mb-5 dark:text-main">Sign up to G-Data Labs</h1>
      <SignupForm registerUser={registerUser} isLoading={isLoading} />
    </div>
  );
}
export default Main;
