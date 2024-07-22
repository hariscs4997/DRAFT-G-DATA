/* eslint-disable no-restricted-syntax */

'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { PersonalInfoSchema } from '@/schema';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { UserType } from '@/state/user/types';
import { PERSONALINFOINITIALVALUES } from '@/constants/account';
import { UpdateUserPayloadType } from '@/types';
import { usePlaidAuth } from '@/hooks/usePlaidAuth';
import BankInformation from './BankInformation';
import UploadPicture from './UploadPicture';

type TProps = {
  user: UserType;
  updateUser: (payload: UpdateUserPayloadType) => void;
  isLoading: boolean;
};

function Form({ user, updateUser, isLoading }: TProps) {
  const [profile, setProfile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>(user.image ?? '');
  const { getPlaidLinkToken, isLoading: isPlaidLoading } = usePlaidAuth();

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      ...PERSONALINFOINITIALVALUES,
      ...user,
      phone: user.phoneNumber,
    },
    validationSchema: PersonalInfoSchema,

    onSubmit: async (results, onSubmit) => {
      const { password } = results;
      if (!profileUrl) return;
      // console.log('values', results);
      let payload: UpdateUserPayloadType = {};

      for (const [key, value] of Object.entries(results)) {
        // @ts-ignore
        // eslint-disable-next-line no-continue
        if (user[key] === value) continue;
        if (key === 'firstName')
          payload = {
            ...payload,
            first_name: value,
          };
        if (key === 'lastName')
          payload = {
            ...payload,
            last_name: value,
          };
        if (key === 'phone' && user.phoneNumber !== results.phone)
          payload = {
            ...payload,
            phone_number: value,
          };

        if (key === 'email')
          payload = {
            ...payload,
            email: value,
          };
      }
      if (password)
        payload = {
          ...payload,
          password,
        };
      if (profile)
        payload = {
          ...payload,
          profile_picture: profile,
        };

      updateUser(payload);
      onSubmit.setSubmitting(false);
    },
  });

  return (
    <form className="w-full" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-row flex-wrap gap-x-14 gap-y-6">
        <UploadPicture handleChange={handleProfileChange} profile={profileUrl} />
        <Input
          label="First Name"
          placeholder="First Name"
          name="firstName"
          error={touched.firstName && errors.firstName}
          onChange={handleChange}
          value={values.firstName}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          error={touched.email && errors.email}
          onChange={handleChange}
          value={values.email}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          error={touched.lastName && errors.lastName}
          onChange={handleChange}
          value={values.lastName}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          error={touched.password && errors.password}
          onChange={handleChange}
          value={values.password}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Username"
          placeholder="Username"
          name="username"
          readOnly
          error={touched.username && errors.username}
          onChange={handleChange}
          value={values.username}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Phone"
          placeholder="Phone"
          name="phone"
          type="number"
          error={touched.phone && errors.phone}
          onChange={handleChange}
          value={values.phone}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Total Rewards"
          placeholder="Total rewards"
          name="totalRewards"
          type="number"
          readOnly
          error={touched.totalRewards && errors.totalRewards}
          value={values.totalRewards}
          isMonetaryInput
          currency="$"
          className="max-w-[450px] w-full"
        />
        {(user.accountNo || user.accountTitle || user.bankName) && (
          <BankInformation values={values} touched={touched} errors={errors} />
        )}

        <div className="w-full flex flex-row mobile:flex-col items-center justify-between gap-x-4 mobile:gap-y-4 mt-10">
          <Button
            type="button"
            className="bg-transparent uppercase disabled:bg-disabledBlue max-w-[320px] w-full border-2 border-black dark:border-white mobile:order-2 connect_btn dark:text-white dark:bg-white"
            style={{ color: 'black' }}
            onClick={getPlaidLinkToken}
            title={user && user.accountNo ? 'Edit bank information' : 'Connect with my bank'}
            isLoading={isPlaidLoading}
          />
          <div className="flex w-full gap-x-4 justify-end mobile:justify-between">
            <Button type="button" className="bg-chat dark:bg-darkChat max-w-[230px] w-full" title="Cancel" />
            <Button
              type="submit"
              className="bg-blue disabled:bg-disabledBlue dark:bg-darkBlue max-w-[230px] w-full"
              title="Save"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default Form;
