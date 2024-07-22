import { DM_Sans, Raleway } from 'next/font/google';

const DMSANS = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const RALEWAY = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export { DMSANS, RALEWAY };
