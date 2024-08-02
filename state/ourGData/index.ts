//index.ts
import { createSlice } from '@reduxjs/toolkit';
import { TConsentAssetsData, TLiveConsentData, TOurGDataSlice } from './types';

const initialState: TOurGDataSlice = {
  liveConsentData: [],
  consentAssetsData: [],
};

const ourGDataSlice = createSlice({
  name: 'our_g_data',
  initialState,
  reducers: {
    setLiveConsentDataAction: (
      state,
      action: {
        payload: TLiveConsentData[];
      },
    ) => ({
      ...state,
      liveConsentData: [...state.liveConsentData, ...action.payload],
    }),
    setConsentAssetsDataAction: (
      state,
      action: {
        payload: TConsentAssetsData[];
      },
    ) => ({
      ...state,
      consentAssetsData: [...state.consentAssetsData, ...action.payload],
    }),
  },
});

export const { setLiveConsentDataAction, setConsentAssetsDataAction } = ourGDataSlice.actions;

export default ourGDataSlice.reducer;
