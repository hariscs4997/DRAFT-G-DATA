/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/config';

export const usePaymentSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setupPayment = useCallback(async (isClick:boolean = true) => {
    try {
      setIsLoading(true);
      const { data } = await api.get('api/stripe/connect_account');
      if(data.link && isClick) window.location.href = data.link
      else return data.onboarding_status
    } catch (e) {
      // console.log('e :>> ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    setupPayment,
    isLoading,
  };
};