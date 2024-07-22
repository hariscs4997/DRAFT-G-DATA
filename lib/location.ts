import { GeolocationSuccessResponseType } from '@/types';

export const getCurrentLocation = (arg: {
  successCallback: (arg: GeolocationSuccessResponseType) => Promise<void>;
  errorCallback: () => void;
}) => {
  const { successCallback, errorCallback } = arg;
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,
  });
};
