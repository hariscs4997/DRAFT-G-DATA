import { NextRequest, NextResponse } from 'next/server';
import { COOKIES } from './types';
import { PATHS } from './constants/navigation';
import { ACCOUNTTYPE } from './constants/auth';

export default async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(COOKIES.TOKEN);
  const user = request.cookies.get(COOKIES.USER);
  const { pathname } = request.nextUrl;

  if (user) {
    const { accountType } = JSON.parse(user.value);
    if (accountType !== ACCOUNTTYPE.COMPANY && pathname === PATHS.BUY) {
      return NextResponse.redirect(new URL(PATHS.HOME, request.url));
    }
    if (
      (!accountType && pathname === PATHS.COMPANY) ||
      (accountType === ACCOUNTTYPE.PERSONAL && pathname === PATHS.COMPANY)
    ) {
      return NextResponse.redirect(new URL(PATHS.HOME, request.url));
    }
    if (pathname === PATHS.OURGDATA) {
      return NextResponse.redirect(new URL(PATHS.DATA, request.url));
    }
  }

  if (cookie && (pathname === PATHS.LOGIN || pathname === PATHS.SIGNUP)) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }
  if (
    (pathname === PATHS.ACCOUNT ||
      pathname === PATHS.COMPANY ||
      pathname.includes(PATHS.MYGDATA) ||
      pathname === PATHS.HISTORY ||
      pathname === PATHS.CHART ||
      pathname === PATHS.ASSETS ||
      pathname === PATHS.DATA ||
      pathname === PATHS.OURGDATA) &&
    !cookie
  ) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}
