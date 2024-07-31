import React from 'react';
import SignupForm from './Form';

function Main() {

  return (
    <div className="w-full py-2  max-w-[950px] mx-auto mt-10">
      <h1 className="text-3xl font-sans font-bold text-primary mb-5 dark:text-main">Sign up to G-Data Labs</h1>
      <SignupForm />
    </div>
  );
}
export default Main;
