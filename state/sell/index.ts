import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'state/store';
import { useEffect } from 'react';
import { getUserInfoFromCookies } from '@/lib/cookies';
import axios from 'axios';

// Define the interface for the sell data
export interface SellData {
  [x: string]: any;
  available_data_count: number;
  available_data_market_value: number;
  available_data_value: number;
  consent_name: string;
  total_data_count: number;
  total_data_value: number;
  used_in_deals_total_count: number;
  used_in_deals_total_value: number;
}

// Define the initial state
const initialState: SellData ={
  available_data_count: 0,
  available_data_market_value: 0,
  available_data_value: 0,
  consent_name: '',
  total_data_count: 0,
  total_data_value: 0,
  used_in_deals_total_count: 0,
  used_in_deals_total_value: 0
}

// Create the sell slice
const sellSlice = createSlice({
  name: 'sell',
  initialState,
  reducers: {
    setSellData: (state, action: PayloadAction<SellData>) => {
      console.log('action.payload', action.payload)
      return action.payload; // Update the state with the payload
    },
  },
});

// Export the action creators and reducer
export const { setSellData } = sellSlice.actions;
export default sellSlice.reducer;