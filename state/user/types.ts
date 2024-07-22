export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  totalRewards: string;
  username: string;
  id: string;
  image: string;
  key: string;
  accountNo?: string;
  accountTitle?: string;
  bankName?: string;
  accountType?: string;
};

export type UserSliceType = {
  isAuthenticated: boolean;
  user: UserType | undefined;
};
