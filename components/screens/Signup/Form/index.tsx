import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { SignupFormSchema } from '@/schema';
import { ACCOUNTTYPE, ACCOUNTTYPESOPTIONS, SIGNUPFORMINITIALVALUES } from '@/constants/auth';
import { PATHS } from '@/constants/navigation';
import Input from '@/components/UI/Input';
import Select from '@/components/UI/Select';
import Button from '@/components/UI/Button';
import Checkbox from '@/components/UI/Checkbox';
import { SignupCredentials } from '@/types';

type TProps = {
  isLoading: boolean;
  registerUser: (payload: SignupCredentials) => void;
};

function SignupForm({ isLoading, registerUser }: TProps) {
  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } = useFormik({
    initialValues: SIGNUPFORMINITIALVALUES,
    validationSchema: SignupFormSchema,

    onSubmit: async (results, onSubmit) => {
      const payload = {
        email: results.email,
        first_name: results.firstName,
        last_name: results.lastName,
        password: results.password,
        is_company: results.accountType === ACCOUNTTYPE.COMPANY,
      };
      registerUser(payload);
      onSubmit.setSubmitting(false);
    },
  });
  return (
    <form className="flex flex-row flex-wrap gap-5 items-center" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-3 relative w-full">
        <span className="block text-base font-bold font-sans text-black dark:text-white">Account Type</span>
        <Select
          value={values.accountType}
          options={ACCOUNTTYPESOPTIONS}
          className="w-auto max-w-[450px]"
          increasePadding="py-[22px]"
          onClick={(item: string) => {
            setFieldValue('accountType', item);
          }}
        />
      </div>
      <Input
        label="First Name"
        placeholder="First Name"
        name="firstName"
        error={touched.firstName && errors.firstName}
        onChange={handleChange}
        value={values.firstName}
        className="w-full max-w-[450px]"
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        name="lastName"
        error={touched.lastName && errors.lastName}
        onChange={handleChange}
        value={values.lastName}
        className="w-full max-w-[450px]"
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        name="email"
        error={touched.email && errors.email}
        onChange={handleChange}
        value={values.email}
        className="w-full max-w-[450px]"
      />
      <Input
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        error={touched.password && errors.password}
        onChange={handleChange}
        value={values.password}
        className="w-full max-w-[450px]"
      />

      <div className="flex flex-col gap-y-5 w-full">
        <Checkbox
          checked={values.termsConditions}
          onChange={handleChange}
          name="termsConditions"
          id="termsConditions"
          className="w-fit"
          error={touched.termsConditions && errors.termsConditions}
          label={
            <p className="text-primary dark:text-main font-sans font-semibold text-base">
              {' '}
              I accept the
              <Link href={PATHS.TERMS} className="text-blue underline ml-1">
                Terms and Conditions
              </Link>
            </p>
          }
        />
        <Checkbox
          checked={values.privacyPolicy}
          onChange={handleChange}
          name="privacyPolicy"
          id="privacyPolicy"
          className="w-fit"
          error={touched.privacyPolicy && errors.privacyPolicy}
          label={
            <p className="text-primary dark:text-main font-sans font-semibold text-base">
              {' '}
              I accept the
              <Link href={PATHS.PRIVACY} className="text-blue underline ml-1">
                Privacy Policy
              </Link>
            </p>
          }
        />
        <Checkbox
          checked={values.cookiePolicy}
          onChange={handleChange}
          name="cookiePolicy"
          id="cookiePolicy"
          className="w-fit"
          error={touched.cookiePolicy && errors.cookiePolicy}
          label={
            <p className="text-primary dark:text-main font-sans font-semibold text-base">
              {' '}
              I accept the
              <Link href={PATHS.COOKIEPOLICY} className="text-blue underline ml-1">
                Cookie Policy
              </Link>
            </p>
          }
        />
        <p className="text-primary  dark:text-main font-sans font-semibold text-base">
          {' '}
          Already have an account?
          <Link href={PATHS.LOGIN} className="text-blue underline ml-1">
            Click here to Login
          </Link>
        </p>
      </div>
      <Button
        type="submit"
        className="bg-blue w-full disabled:bg-disabledBlue max-w-[450px]"
        title="Sign up"
        isLoading={isLoading}
      />
    </form>
  );
}
export default SignupForm;
