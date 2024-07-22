/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { api } from '@/config';
import { useUser } from '@/state/user/hooks';

export const usePlaidAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [linkToken, setLinkToken] = useState('');
  const { setUser, user } = useUser();

  const addAndVerifyBankWithPlaidData = useCallback(
    async (arg: { public_token: string; account_id: string }) => {
      try {
        setIsLoading(true);
        const { data } = await api.post('api/user_profile/add_and_verify_bank', arg);
        // console.log('data :>> ', data.data);
        if (user)
          setUser({
            user: {
              ...user,
              accountNo: `**** ${data.data.shortened_account_number}`,
              accountTitle: data.data.bank_account_title ?? '',
              bankName: data.data.bank_name,
            },
            isAuthenticated: true,
          });
        //* reset link token
        setLinkToken('');
      } catch (e) {
        // console.log('e :>> ', e);
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, user],
  );

  const { ready, open } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string, metadata: any) => {
      // send public_token to server
      // console.log('info===>', public_token, metadata);
      addAndVerifyBankWithPlaidData({ public_token, account_id: metadata.account_id });
    },
  });
  const getPlaidLinkToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('api/plaid/link_token');
      // console.log('data :>> ', data.data);
      setLinkToken(data.data.link_token);
    } catch (e) {
      // console.log('e :>> ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (linkToken && ready) open();
  }, [open, ready, linkToken]);
  return {
    getPlaidLinkToken,
    isLoading,
  };
};
