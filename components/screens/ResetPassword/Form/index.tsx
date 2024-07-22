import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { ResetPasswordFormSchema, ResetPasswordFormSchemaType } from '@/schema';
import { PATHS } from '@/constants/navigation';
import { RESETPASSWORDFORMINITIALVALUES } from '@/constants/auth';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

type TProps = {
  isLoading: boolean;
  resetPassword: (payload: ResetPasswordFormSchemaType) => void;
};

function ResetPasswordForm({ isLoading, resetPassword }: TProps) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: RESETPASSWORDFORMINITIALVALUES,
    validationSchema: ResetPasswordFormSchema,

    onSubmit: async (results, onSubmit) => {
      resetPassword(results);
      onSubmit.setSubmitting(false);
    },
  });
  return (
    <form className="flex flex-col gap-y-5" noValidate onSubmit={handleSubmit}>
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        name="email"
        error={touched.email && errors.email}
        onChange={handleChange}
        value={values.email}
        className="w-full"
      />

      <Link href={PATHS.LOGIN} className="font-sans font-semibold text-base text-blue underline text-center">
        Go back to Login
      </Link>

      <Button type="submit" className="bg-blue w-full disabled:bg-disabledBlue" title="Submit" isLoading={isLoading} />
    </form>
  );
}
export default ResetPasswordForm;
