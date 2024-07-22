import axios from 'axios';
// import { api } from '@/config';

import { useCallback } from 'react';
import { getUserInfoFromCookies } from '@/lib/cookies';
import { toast } from 'react-toastify';
export type PERSONALData = {
  personal_data_field_id: any;
  amount: number | undefined
  qunatity: number | undefined; 
  
};
export const useSellData = () => {
  const fetchData = useCallback(async (personalData: PERSONALData) => {
    const token=getUserInfoFromCookies()
    try {
      const {data} = await axios.post('https://api.g-datalabs.com/api/user_consent_deals', personalData, {
        headers: {
          Authorization: `Bearer ${token?.key}`,
        },
      });
      toast.success('Sell Updated');
      
      // window.location.reload()
      return data
    } catch (error) {
    }
  }, []);

  return { fetchData };
};