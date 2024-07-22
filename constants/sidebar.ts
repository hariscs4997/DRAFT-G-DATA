import { NAVITEMS as TNAVITEMS } from '@/types';
import { PATHS } from './navigation';
import { home, history, account, home_dark, history_dark, account_dark, logout } from '../public/assets';

export const SIDEBARLINKSCOLORS = {
  DARK: ['#907CB4', '#F5B11A', '#A1BF8C', '#046C98', '#EA6D24'],
  LIGHT: ['#EE3E2E', '#3B7BBE', '#EFDCB1', '#DDAF40', '#E9CB84'],
};

export const AUTHITEMS: TNAVITEMS[] = [
  {
    title: 'Home',
    icon: home,
    to: PATHS.HOME,
  },
  {
    title: 'Login',
    icon: logout,
    to: PATHS.LOGIN,
  },
  {
    title: 'Register',
    icon: account,
    to: PATHS.SIGNUP,
  },
];

export const APPITEMS: TNAVITEMS[] = [
  {
    title: 'Home',
    icon: home,
    to: PATHS.HOME,
    icon_dark: home_dark,
  },
  {
    title: 'History',
    icon: history,
    to: PATHS.HISTORY,
    icon_dark: history_dark,
  },
  {
    title: 'My G-Data',
    icon: '/images/logo.png',
    icon_dark: '/images/logo-dark.png',
    to: PATHS.MYGDATA,
    nestedItems: [
      {
        title: 'Personal Data',
        icon: '',
        to: PATHS.PERSONAL,
      },
      {
        title: 'Consent',
        icon: '',
        to: PATHS.CONSENT,
      },

      {
        title: 'Rewards',
        icon: '',
        to: PATHS.REWARDS,
      },
      {
        title: 'Screen Data',
        icon: '',
        to: PATHS.SCREEN,
      },
    ],
  },
  {
    title: 'Our G-Data',
    icon: '/images/logo.png',
    icon_dark: '/images/logo-dark.png',
    to: PATHS.OURGDATA,
    nestedItems: [
      {
        title: 'Data',
        icon: '',
        to: PATHS.DATA,
      },
      {
        title: 'Assets',
        icon: '',
        to: PATHS.ASSETS,
      },
    ],
  },
  {
    title: 'My Account',
    icon: account,
    to: PATHS.ACCOUNT,
    icon_dark: account_dark,
  },
];
