export type TLiveConsentData = {
  name: string;
  price: string;
};
export type TConsentAssetsData = {
  name: String;
  price: Number;
  quantity: number;
  total: number;
};
export type TOurGDataSlice = {
  liveConsentData: TLiveConsentData[];
  consentAssetsData: TConsentAssetsData[];
};
