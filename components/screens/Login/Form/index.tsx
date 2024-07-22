import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { LoginFormSchema } from '@/schema';
import { LOGINFORMINITIALVALUES } from '@/constants/auth';
import { PATHS } from '@/constants/navigation';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { UserCredentials } from '@/types';

type TProps = {
  isLoading: boolean;
  loginUser: (payload: UserCredentials) => void;
};

function LoginForm({ isLoading, loginUser }: TProps) {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: LOGINFORMINITIALVALUES,
    validationSchema: LoginFormSchema,

    onSubmit: async (results, onSubmit) => {
      // console.log('values', results);
      loginUser(results);
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
      <Input
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        error={touched.password && errors.password}
        onChange={handleChange}
        value={values.password}
        className="w-full"
      />
      <p className="text-primary dark:text-main font-sans font-semibold text-base">
        {' '}
        Don&apos;t have an account?
        <Link href={PATHS.SIGNUP} className="text-blue underline ml-1">
          Click here to Sign up
        </Link>
      </p>

      <Button type="submit" className="bg-blue w-full disabled:bg-disabledBlue" title="Sign In" isLoading={isLoading} />

      <Link href={PATHS.RESETPASSWORD} className="text-blue underline text-center font-sans font-semibold text-base">
        Forgot Password?
      </Link>
    </form>
  );
}
export default LoginForm;
