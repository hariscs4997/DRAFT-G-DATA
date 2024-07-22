import { createSlice } from '@reduxjs/toolkit';
import { SidebarSliceType } from './types';

const initialState: SidebarSliceType = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpenAction: (
      state,
      action: {
        payload: boolean;
      },
    ) => ({
      isOpen: action.payload,
    }),
  },
});

export const { setIsOpenAction } = sidebarSlice.actions;

export default sidebarSlice.reducer;
