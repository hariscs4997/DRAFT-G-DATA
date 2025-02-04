'use client'
import React from 'react';
import { useFormik } from 'formik';
import { ConfirmPasswordFormSchema, ConfirmPasswordFormSchemaType } from '@/schema';
import { CONFIRMPASSWORDFORMINITIALVALUES } from '@/constants/auth';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useSearchParams } from 'next/navigation';

type TProps = {
  isLoading: boolean;
  confirmPassword: (payload: any) => void;
};

function ConfirmPasswordForm({ isLoading, confirmPassword }: TProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: CONFIRMPASSWORDFORMINITIALVALUES,
    validationSchema: ConfirmPasswordFormSchema,

    onSubmit: async (results, onSubmit) => {
      confirmPassword({ ...results, token });
      onSubmit.setSubmitting(false);
    },
  });
  return (
    <form className="flex flex-col gap-y-5" noValidate onSubmit={handleSubmit}>
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        error={touched.password && errors.password}
        onChange={handleChange}
        value={values.password}
        className="w-full"
      />
      <Input
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        name="confirm_password"
        error={touched.confirm_password && errors.confirm_password}
        onChange={handleChange}
        value={values.confirm_password}
        className="w-full"
      />
      <Button type="submit" className="bg-blue w-full disabled:bg-disabledBlue" title="Submit" isLoading={isLoading} />
    </form>
  );
}
export default ConfirmPasswordForm;
