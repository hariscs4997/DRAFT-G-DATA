import { Theme } from '@/types';

export const getInitialTheme = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
  }
  return Theme.LIGHT;
};
export const toavoiderror = true;
