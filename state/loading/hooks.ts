import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { setIsLoadingStateAction } from '.';
import { LoadingSliceType } from './types';

export const useLoading = () => {
  const { isLoading } = useSelector<RootState, LoadingSliceType>((state) => state.loading);
  const dispatch = useAppDispatch();

  const setIsLoading = useCallback(
    (payload: boolean) => {
      dispatch(setIsLoadingStateAction(payload));
    },
    [dispatch],
  );

  return {
    isLoading,
    setIsLoading,
  };
};
