import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { setWeatherAction } from '.';
import { WeatherSliceType, WeatherType } from './types';

export const useWeatherState = () => {
  const { weather } = useSelector<RootState, WeatherSliceType>((state) => state.weather);
  const dispatch = useAppDispatch();

  const setWeather = useCallback(
    (payload: WeatherType) => {
      dispatch(setWeatherAction(payload));
    },
    [dispatch],
  );

  return {
    weather,
    setWeather,
  };
};
