import Cookies from 'js-cookie';
import { UserType } from 'state/user/types';
import { COOKIES } from 'types';

export const getUserInfoFromCookies = () => {
  const result = Cookies.get(COOKIES.USER);
  if (result) {
    const user: UserType = JSON.parse(result);
    return user;
  }
  return null;
};

export const saveUserInfoInCookies = (user: UserType) => {
  const data = JSON.stringify(user);
  const token = user.key;
  Cookies.set(COOKIES.TOKEN, token);
  Cookies.set(COOKIES.USER, data);
};

export const deleteUserInfoFromCookies = () => {
  Cookies.remove(COOKIES.USER);
  Cookies.remove(COOKIES.TOKEN);
};
