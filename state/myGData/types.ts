import { TOptions } from '@/types';
import { MultiValue } from 'react-select';
//types.ts
export type Data = {
  [key: string]: {
    [key: string]: {};
  };
};
export type CData = { [key: string]: {} };
export type ScreenDataType = {
  id: number;
  screenRecording: string;
  cameraRecording: string;
  date: string;
  detail: string;
};
export type MyGDataSliceType = {
  personalData: Data;
  gData: Data;
  rData: CData;
  cData: CData;
  compData: CData;
  screenData: ScreenDataType[];
};

export type UpdateConsentRewardType = {
  demanded_reward_value?: Number;
  consents_to_sell?: boolean;
};

export type UpdateConsentCompanyType = {
  use: MultiValue<TOptions>;
  threshold: string;
  pricing: string;
  consents_to_buy: boolean;
};
