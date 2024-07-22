/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { getCurrentLocation } from '@/lib/location';
import { GeolocationSuccessResponseType } from '@/types';
import { useWeatherState } from '@/state/weather/hooks';
import { WeatherType } from '@/state/weather/types';
import { useUser } from '@/state/user/hooks';

const POLL_ONE_HOUR = 60 * 60 * 1000;

export const useWeather = () => {
  const { setWeather } = useWeatherState();
  const { user } = useUser();
  const getCurrentLocationWeather = useCallback(
    async (response: GeolocationSuccessResponseType) => {
      try {
        const { coords } = response;
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=imperial`,
        );
        if (!data.main) return;
        const payload: WeatherType = {
          lowestTemperature: data.main.temp_min,
          highestTemperature: data.main.temp_max,
        };
        setWeather(payload);
      } catch (e) {
        // console.log('e :>> ', e);
      }
    },
    [setWeather],
  );

  const errorCallback = useCallback(async () => {}, []);

  useEffect(() => {
    if (user) getCurrentLocation({ successCallback: getCurrentLocationWeather, errorCallback });

    setInterval(() => {
      getCurrentLocation({ successCallback: getCurrentLocationWeather, errorCallback });
    }, POLL_ONE_HOUR);
  }, [errorCallback, getCurrentLocationWeather, user]);

  return {
    getCurrentLocationWeather,
  };
};
