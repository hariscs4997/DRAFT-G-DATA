import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, useAppDispatch } from 'state/store';
import { setIsOpenAction } from '.';
import { SidebarSliceType } from './types';

export const useSidebar = () => {
  const { isOpen } = useSelector<RootState, SidebarSliceType>((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const setIsOpen = useCallback(
    (payload: boolean) => {
      dispatch(setIsOpenAction(payload));
    },
    [dispatch],
  );

  return {
    isOpen,
    setIsOpen,
  };
};
