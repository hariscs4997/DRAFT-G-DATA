/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { api } from '@/config';
import { useLoading } from '@/state/loading/hooks';
import { useUser } from '@/state/user/hooks';
import { UserType } from '@/state/user/types';
import { SignupCredentials, UpdateUserPayloadType, UserCredentials } from 'types';
import { ACCOUNTTYPE } from '@/constants/auth';
import { PATHS } from '@/constants/navigation';
import { generateAvatar } from '@/lib';
import { useChats } from '@/state/chats/hooks';
import { ConfirmPasswordFormSchemaType, ResetPasswordFormSchemaType } from '@/schema';

export const useAuth = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { setUser, isAuthenticated, user } = useUser();
  const { deleteChats } = useChats();
  const router = useRouter();

  const getUserInfo = useCallback(async (token: string) => {
    const { data } = await api.get('api/user_profile/1/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { email, first_name, last_name, phone_number, total_rewards, username, id, is_company } = data.data;
    let { profile_picture_url } = data.data;
    if (!profile_picture_url) {
      profile_picture_url = generateAvatar(first_name);
    }
    const userInfo: UserType = {
      email,
      firstName: first_name,
      lastName: last_name,
      id,
      username,
      image: profile_picture_url,
      phoneNumber: phone_number,
      totalRewards: total_rewards,
      key: '',
      accountType: is_company ? ACCOUNTTYPE.COMPANY : ACCOUNTTYPE.PERSONAL,
    };

    return userInfo;
  }, []);

  const loginUser = useCallback(
    async (credentials: UserCredentials) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('login_api', credentials);
        const userInfo = await getUserInfo(data.access_token);
        const payload: UserType = {
          ...userInfo,
          totalRewards: userInfo.totalRewards ?? 0,
          key: data.access_token,
        };

        setUser({ user: payload, isAuthenticated: true });
        router.replace(PATHS.HOME);
        toast.success('Welcome to G-Data Labs');
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.error);
        else toast.error('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUser, router, getUserInfo],
  );

  const updateUser = useCallback(
    async (payload: UpdateUserPayloadType) => {
      try {
        setIsLoading(true);
        const formdata = new FormData();
        for (const [key, value] of Object.entries(payload)) {
          formdata.append(key, value);
        }
        const { data } = await api.patch('api/user_profile/1/', formdata);
        let { profile_picture_url } = data.data;
        if (!profile_picture_url) {
          profile_picture_url = generateAvatar(data.data.first_name);
        }
        const updatedUserInfo: UserType = {
          ...user,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          phoneNumber: data.data.phone_number,
          totalRewards: data.data.total_rewards ?? 0,
          email: data.data.email,
          image: profile_picture_url,
          username: data.data.username,
          id: data.data.id,
          key: user?.key!,
        };
        setUser({ user: updatedUserInfo, isAuthenticated: true });
        toast.success('Personal information updated successfully');
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.error);
        else toast.error('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUser, user],
  );

  const registerUser = useCallback(
    async (credentials: SignupCredentials) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('signup_api', credentials);
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success('Your account has been successfully created');
        router.replace(PATHS.LOGIN);
      } catch (e) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, router],
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordFormSchemaType) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('api/user/reset_password_email', payload);
        toast.success(data.message);
        router.push(PATHS.CONFIRMPASSWORD);
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.error);
        else toast.error('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, router],
  );
  const confirmPassword = useCallback(
    async (payload: ConfirmPasswordFormSchemaType) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('api/user/reset_token_confirm', payload);
        toast.success(data.message);
        router.push(PATHS.LOGIN);
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.error);
        else toast.error('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, router],
  );
  const logoutUser = useCallback(() => {
    setUser({ user: undefined, isAuthenticated: false });
    deleteChats();
    toast.success('Logout Successful.');
    router.replace(PATHS.LOGIN);
  }, [setUser, router, deleteChats]);

  return {
    loginUser,
    logoutUser,
    isLoading,
    registerUser,
    isAuthenticated,
    user,
    updateUser,
    resetPassword,
    confirmPassword,
  };
};
