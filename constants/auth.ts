import {
  ConfirmPasswordFormSchemaType,
  LoginFormSchemaType,
  ResetPasswordFormSchemaType,
  SellFormSchemaType,
  SignupFormSchemaType,
} from '@/schema';
import { TDropdownOption } from '@/types';

export enum ACCOUNTTYPE {
  PERSONAL = 'Personal',
  COMPANY = 'Company',
}
export const ACCOUNTTYPESOPTIONS: TDropdownOption[] = [
  { label: ACCOUNTTYPE.PERSONAL, value: ACCOUNTTYPE.PERSONAL },
  { label: ACCOUNTTYPE.COMPANY, value: ACCOUNTTYPE.COMPANY },
];
export const LOGINFORMINITIALVALUES: LoginFormSchemaType = {
  email: '',
  password: '',
};
export const RESETPASSWORDFORMINITIALVALUES: ResetPasswordFormSchemaType = {
  email: '',
};
export const CONFIRMPASSWORDFORMINITIALVALUES: ConfirmPasswordFormSchemaType = {
  token: '',
  password: '',
  confirm_password: '',
};
export const SIGNUPFORMINITIALVALUES: SignupFormSchemaType = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  privacyPolicy: false,
  termsConditions: false,
  cookiePolicy: false,
  accountType: ACCOUNTTYPESOPTIONS[0].label,
};
export const SELLINITIALVALUES: SellFormSchemaType = {
  limitPrice: 0.0,
  amount: 0.0,
  total: 0.0,
};
