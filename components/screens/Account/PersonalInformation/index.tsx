'use client';

import React, { memo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { maxWidth } from '@/constants';
import Form from './Form';

function PersonalInformation() {
  const { user, updateUser, isLoading } = useAuth();
  return (
    <div
      className={`mt-4 bg-lightGreen  dark:bg-dark w-full pl-12 pr-8 py-7 mobile:px-2  rounded-md h-[calc(100%_-_6rem)] overflow-y-auto relative max-w-[${maxWidth}]`}
    >
      <h1 className="text-primary dark:text-main text-2xl font-bold font-sans mb-7">Personal Information</h1>
      {user && <Form user={user} updateUser={updateUser} isLoading={isLoading} />}
    </div>
  );
}
export default memo(PersonalInformation);
