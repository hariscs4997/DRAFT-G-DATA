//hook.ts
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import {
  setCDataAction,
  setCompDataAction,
  setGDataAction,
  setPersonalDataAction,
  setRDataAction,
  setScreenDataAction,
} from '.';
import { CData, Data, MyGDataSliceType, ScreenDataType } from './types';

export const usePersonalData = () => {
  const { personalData, gData, rData, cData, screenData, compData } = useSelector<RootState, MyGDataSliceType>(
    (state) => state.my_g_data,
  );
  const dispatch = useAppDispatch();

  const setPersonalData = useCallback(
    (payload: Data) => {
      dispatch(setPersonalDataAction(payload));
    },
    [dispatch],
  );
  const setGData = useCallback(
    (payload: Data) => {
      dispatch(setGDataAction(payload));
    },
    [dispatch],
  );
  const setRData = useCallback(
    (payload: Data) => {
      dispatch(setRDataAction(payload));
    },
    [dispatch],
  );
  const setCData = useCallback(
    (payload: CData) => {
      dispatch(setCDataAction(payload));
    },
    [dispatch],
  );
  const setCompData = useCallback(
    (payload: CData) => {
      dispatch(setCompDataAction(payload));
    },
    [dispatch],
  );
  const setScreenData = useCallback(
    (payload: ScreenDataType[]) => {
      dispatch(setScreenDataAction(payload));
    },
    [dispatch],
  );
  return {
    setPersonalData,
    setGData,
    setRData,
    setCData,
    setScreenData,
    setCompData,
    screenData,
    cData,
    rData,
    personalData,
    gData,
    compData,
  };
};
