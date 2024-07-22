import { createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from './types';

const initialState: UserSliceType = {
  isAuthenticated: false,
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction: (
      state,
      action: {
        payload: UserSliceType;
      },
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUserAction } = userSlice.actions;

export default userSlice.reducer;
