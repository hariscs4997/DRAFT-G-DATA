import { InferType, array, boolean, mixed, number, object, ref, string } from 'yup';

export const PersonalInfoSchema = object({
  firstName: string().min(2, 'First Name is too short').required('First Name is required'),
  lastName: string().min(2, 'Last Name is too short').required('Last Name is required'),
  email: string().email().required('Email is required'),
  password: string(),
  username: string().nullable(),
  phone: number().nullable(),
  totalRewards: number(),
  accountNo: string(),
  accountTitle: string(),
  bankName: string(),
});
export const PersonalDataSchema = object({
  date: string(),
  high_temperature: number(),
  low_temperature: number(),
  emotional_list: array().of(string()),
  emotional_overall: string(),
  weather: string(),
  relative_finance_status: string(),
  exercise_time: number(),
  photos: mixed(),
  health_overall: string(),
  any_social_life: string(),
  social_life_list: array().of(string()),
  weight: number(),
  family_status: string(),
  device_screen_time: string(),
  work_life_balance: number().min(0, 'Value must be at least 0').max(10, 'Value must not exceed 10'),
  journaling: string(),
});

export const LoginFormSchema = object({
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
});
export const SellFormSchema = object({
  limitPrice: number().min(1, 'Value must be at least 0'),
  amount: number().min(0, 'Value must be at least 0'),
  total: number().min(0, 'Value must be at least 0'),
});
export const SignupFormSchema = object({
  firstName: string().min(2, 'First Name is too short').required('First Name is required'),
  lastName: string().min(2, 'Last Name is too short').required('Last Name is required'),
  email: string().email().required('Email is required'),
  password: string().min(5, 'Password must be 5 characters long').required('Password is required'),
  accountType: string().required('Account type is required'),
  termsConditions: boolean()
    .test('is-true', 'You must accept the terms and conditions.', (value) => value === true)
    .required('Please accept the Terms and Conditions in order to proceed'),
  privacyPolicy: boolean().when('termsConditions', {
    is: true,
    then: (schema) => schema.oneOf([true], 'You must accept privacy and policy.'),
  }),
  cookiePolicy: boolean().when(['privacyPolicy'], {
    is: true,
    then: (schema) => schema.oneOf([true], 'You must accept cookie policy.'),
  }),
});
export const ResetPasswordFormSchema = object({
  email: string().email().required('Email is required'),
});

export const ConfirmPasswordFormSchema = object({
  token: string().required('Token cannot be empty'),
  password: string().required('Password is required'),
  confirm_password: string()
    .oneOf([ref('password'), ''], 'Password must match')
    .required('Confirm Password is required'),
});

export type PersonalInfoSchemaType = InferType<typeof PersonalInfoSchema>;
export type PersonalDataSchemaType = InferType<typeof PersonalDataSchema>;
export type LoginFormSchemaType = InferType<typeof LoginFormSchema>;
export type ResetPasswordFormSchemaType = InferType<typeof ResetPasswordFormSchema>;
export type ConfirmPasswordFormSchemaType = InferType<typeof ConfirmPasswordFormSchema>;

export type SignupFormSchemaType = InferType<typeof SignupFormSchema>;
export type SellFormSchemaType = InferType<typeof SellFormSchema>;
