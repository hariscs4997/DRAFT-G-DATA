//index.ts
import { createSlice } from '@reduxjs/toolkit';
import { CONSENTTABLEDATA } from '@/constants/consent';
import { COMPANYTABLEDATA } from '@/constants/company';
import { REWARDSTABLEDATA } from '@/constants/rewards';
import { CData, Data, MyGDataSliceType, ScreenDataType } from './types';

const initialState: MyGDataSliceType = {
  personalData: {},
  gData: {},
  rData: REWARDSTABLEDATA,
  cData: CONSENTTABLEDATA,
  compData: COMPANYTABLEDATA,
  screenData: [],
};

const personalDataSlice = createSlice({
  name: 'my_g_data',
  initialState,
  reducers: {
    setPersonalDataAction: (
      state,
      action: {
        payload: Data;
      },
    ) => ({
      ...state,
      personalData: action.payload,
    }),
    setGDataAction: (
      state,
      action: {
        payload: Data;
      },
    ) => ({
      ...state,
      gData: action.payload,
    }),
    setRDataAction: (
      state,
      action: {
        payload: CData;
      },
    ) => ({
      ...state,
      rData: {
        ...state.rData,
        ...action.payload,
      },
    }),
    setCDataAction: (
      state,
      action: {
        payload: CData;
      },
    ) => ({
      ...state,
      cData: {
        ...state.cData,
        ...action.payload,
      },
    }),
    setCompDataAction: (
      state,
      action: {
        payload: CData;
      },
    ) => ({
      ...state,
      compData: {
        ...state.compData,
        ...action.payload,
      },
    }),
    setScreenDataAction: (
      state,
      action: {
        payload: ScreenDataType[];
      },
    ) => ({
      ...state,
      screenData: action.payload,
    }),
  },
});

export const {
  setPersonalDataAction,
  setGDataAction,
  setRDataAction,
  setCDataAction,
  setScreenDataAction,
  setCompDataAction,
} = personalDataSlice.actions;

export default personalDataSlice.reducer;
