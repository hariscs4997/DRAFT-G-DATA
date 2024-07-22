import { createSlice } from '@reduxjs/toolkit';
import { WeatherSliceType, WeatherType } from './types';

const initialState: WeatherSliceType = {
  weather: undefined,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherAction: (
      state,
      action: {
        payload: WeatherType;
      },
    ) => ({
      ...state,
      weather: action.payload,
    }),
  },
});

export const { setWeatherAction } = weatherSlice.actions;

export default weatherSlice.reducer;
