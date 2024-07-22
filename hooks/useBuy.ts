import axios from 'axios';

import { useCallback } from 'react';
import { getUserInfoFromCookies } from '@/lib/cookies';
import { api } from '@/config';
import { toast } from 'react-toastify';
import { useTableData } from '@/state/table/hook';

export type BuyData = {
  user_consent_deal_id: Number;
  amount_offered: Number;
};
export type TransactionData = {
  personal_data_field_id: Number | undefined;
  seller_id: Number | undefined;
  amount: Number | undefined;
  qunatity: Number | undefined;
  status: String | undefined;
  user_consent_deal_id?: Number | undefined;

  amount_offered?: Number | undefined;
};
export const useBuyData = () => {
  const { fetchTableData } = useTableData();
  const fetchBuyData = useCallback(async () => {
    const token = getUserInfoFromCookies();
    try {
      const response = await axios.get('https://api.g-datalabs.com/api/company/user_consent_deals', {
        headers: {
          Authorization: `Bearer ${token?.key}`,
        },
      });
      console.log('response.data', response.data);
      return response.data;
    } catch (error) {
      // console.log('error :>> ', error);
    }
  }, []);
  const fetchInterestedCompany = useCallback(async (id: Number) => {
    const token = getUserInfoFromCookies();
    try {
      const { data } = await api.get(
        `https://api.g-datalabs.com/api/deal_offer?user_consent_deal_id=${id}
      `,
        {
          headers: {
            Authorization: `Bearer ${token?.key}`,
          },
        },
      );
      console.log('data12345', data);
      return data;
    } catch (error) {
      // console.log('error :>> ', error);
    }
  }, []);
  const fetchBuyDetails = useCallback(async (buyData: BuyData) => {
    const token = getUserInfoFromCookies();
    try {
      const { data } = await api.post('https://api.g-datalabs.com/api/deal_offer', buyData, {
        headers: {
          Authorization: `Bearer ${token?.key}`,
        },
      });
      toast.success('Order Placed');
      return data;
    } catch (error) {}
  }, []);

  const selectedCompany = useCallback(async (id: number) => {
    const token = getUserInfoFromCookies();

    try {
      const response = await axios.patch(
        `https://api.g-datalabs.com/api/deal_offer/${id}/`,
        {
          status: 'ACCEPTED',
        },
        {
          headers: {
            Authorization: `Bearer ${token?.key}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success('Order Updated');
        return response.data;
      }
      // Handle other status codes or errors
    } catch (error) {
      // Handle errors
    }
  }, []);
  const transactionDetails = useCallback(async (transactionData: TransactionData) => {
    const token = getUserInfoFromCookies();
    try {
      const { data } = await api.post('https://api.g-datalabs.com/api/deal_transaction', transactionData, {
        headers: {
          Authorization: `Bearer ${token?.key}`,
        },
      });
      toast.success('Transaction Successfully Done');
      await fetchTableData();
      return data;
    } catch (error) {}
  }, []);

  return { fetchBuyData, fetchBuyDetails, fetchInterestedCompany, selectedCompany, transactionDetails };
};
