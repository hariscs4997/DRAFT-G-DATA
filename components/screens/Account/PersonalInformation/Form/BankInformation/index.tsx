'use client';

import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import Input from '@/components/UI/Input';

interface IProps {
  values: {
    accountNo?: string | undefined;
    accountTitle?: string | undefined;
    bankName?: string | undefined;
  };
  touched: FormikTouched<{
    accountNo?: string | undefined;
    accountTitle?: string | undefined;
    bankName?: string | undefined;
  }>;
  errors: FormikErrors<{
    accountNo?: string | undefined;
    accountTitle?: string | undefined;
    bankName?: string | undefined;
  }>;
}

function CardInformation({ values, touched, errors }: IProps) {
  return (
    <div className="w-full">
      <h1 className="text-primary dark:text-main text-2xl font-bold font-sans mt-8 mb-7">Bank Information</h1>
      <div className="flex flex-row flex-wrap gap-x-14 gap-y-6 ">
        <Input
          label="Account No."
          placeholder="**** 4568"
          readOnly
          name="accountNo"
          error={touched.accountNo && errors.accountNo}
          value={values.accountNo}
          className="max-w-[450px] w-full"
        />
        <Input
          label="Account Title"
          placeholder="12115 54515 4545 5454"
          readOnly
          name="accountTitle"
          error={touched.accountTitle && errors.accountTitle}
          value={values.accountTitle}
          className="max-w-[450px] w-full"
        />

        <Input
          label="Bank Name"
          placeholder="Chase Bank"
          readOnly
          name="bankName"
          error={touched.bankName && errors.bankName}
          value={values.bankName}
          className="max-w-[450px] w-full"
        />
      </div>
    </div>
  );
}
export default CardInformation;
