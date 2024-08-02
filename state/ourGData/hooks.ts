//hook.ts
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { setConsentAssetsDataAction, setLiveConsentDataAction } from '.';
import { TConsentAssetsData, TLiveConsentData, TOurGDataSlice } from './types';

export const useOurGData = () => {
  const { liveConsentData, consentAssetsData } = useSelector<RootState, TOurGDataSlice>((state) => state.our_g_data);
  const dispatch = useAppDispatch();

  const setLiveConsentData = useCallback(
    (payload: TLiveConsentData[]) => {
      dispatch(setLiveConsentDataAction(payload));
    },
    [dispatch],
  );

  const setConsentAssetsData = useCallback(
    (payload: TConsentAssetsData[]) => {
      dispatch(setConsentAssetsDataAction(payload));
    },
    [dispatch],
  );

  return {
    liveConsentData,
    setLiveConsentData,
    setConsentAssetsData,
    consentAssetsData,
  };
};
