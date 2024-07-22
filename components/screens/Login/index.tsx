'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from './Form';

function Main() {
  const { loginUser, isLoading } = useAuth();

  return (
    <div className="absolute-center w-full max-w-[450px] overflow-y-auto">
      <h1 className="text-3xl font-sans font-bold text-primary mb-5 dark:text-main">Sign in to G-Data Labs</h1>
      <LoginForm loginUser={loginUser} isLoading={isLoading} />
    </div>
  );
}
export default Main;
