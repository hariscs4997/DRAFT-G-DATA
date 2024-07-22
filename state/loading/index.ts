import { createSlice } from '@reduxjs/toolkit';
import { LoadingSliceType } from './types';

const initialState: LoadingSliceType = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoadingStateAction: (
      state,
      action: {
        payload: boolean;
      },
    ) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const { setIsLoadingStateAction } = loadingSlice.actions;

export default loadingSlice.reducer;
