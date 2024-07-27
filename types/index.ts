import { StaticImageData } from 'next/image';
import { ResponseChoice } from '@/state/chats/types';

type NAVITEM = {
  title: string;
  icon: any;
  to: string;
  icon_dark?: string | StaticImageData;
};
export type NAVITEMS = NAVITEM & {
  nestedItems?: NAVITEM[];
};
export interface ChartData {
  [key: string]: number;
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export type TPROPTION = {
  title: string;
  color: string;
  value: ResponseChoice;
  darkColor: string;
};

export type Columns = {
  col1: string;
  col2: string;
};
export enum COOKIES {
  USER = 'user',
  TOKEN = 'token_datalabs',
}
export type UserCredentials = {
  password: string;
  email: string;
};
export type UpdateUserPayloadType = {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  total_rewards?: string;
  username?: string;
  password?: string;
  profile_picture?: File;
};

export type SignupCredentials = {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
};
export type ScreenData = {
  url: any;
  name: string;
};
export enum TableName {
  PData = 'Personal Data',
  GData = 'My G-Data',
  RData = 'Rewards Data',
  CData = 'Consent Data',
  CompData = 'Company Data',
}

export type PersonalDataType = {
  consents_to_sell: boolean;
  created_at: string;
  demanded_reward_value: string;
  id: number;
  history: any;
  personal_data_field: {
    field_name: string;
    user_id: number;
  };
  personal_data_field_id: number;
  value: string;
};
export type GDataType = {
  consents_to_sell: boolean;
  created_at: string;
  demanded_reward_value: string;
  field_name: string;
  id: number;
  user_id: number;
  values: [
    {
      created_at: string;
      value: string;
    },
  ];
};

export type ChatHistoryResponseType = {
  answer: string;
  chat_id: number;
  choice: null;
  id: number;
  images: string;
  question: string;
  timestamp: string;
  u_email: string;
  user_id: number;
};

export type ScreenDataResponseType = {
  camera_recording_url: string | null;
  data: string;
  id: number;
  screen_recording_url: string;
  timestamp: string;
  user_id: number;
};
export type GeolocationSuccessResponseType = {
  coords: GeolocationCoordinates;
  timestamp: number;
};

export type RecentChatHistoryResponseType = {
  created_at: string;
  history: [
    {
      answer: string;
      chat_id: number;
      choice: boolean | null;
      id: number;
      images: string;
      question: string;
      timestamp: string;
      u_email: string;
      user_id: number;
    },
  ];
  id: number;
  name: string;
  status: string;
  user_id: number;
};

export type TDropdownOption = {
  label: string;
  value: string;
};

export type UpdateCompanyConsentPayload = {
  demanded_reward_value?: number;
  threshold?: number;
  usage?: string;
  consents_to_buy?: boolean;
  personal_data_field: {
    field_name: string;
  };
}[];

export type TCompanyConsentDeals = {
  price: number;
  id: number;
  name: string;
  unit: number;
  status: string;
  total: number;
};

export type TUserConsentDeals = {
  amount: string;
  created_at: string;
  creator_id: number;
  id: number;
  personal_data_field_id: number;
  qunatity: number;
  status: string;
  updated_at: string;
};

export type TConsentSellInfo = {
  available_data_count: number;
  available_data_market_value: number;
  available_data_value: number;
  consent_name: string;
  total_data_count: number;
  total_data_value: number;
  used_in_deals_total_count: number;
  used_in_deals_total_value: number;
};