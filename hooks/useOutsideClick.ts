'use client';

import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLElement> | null, callback: () => void) => {
  const handleClickOutside = useCallback(
    (event: any) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [callback, ref],
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
