/* eslint-disable consistent-return */
import { useCallback } from 'react';
import { api } from '@/config';
import { toast } from 'react-toastify';
import { useLoading } from '@/state/loading/hooks';
type TBuyConsentOfferPayload = {
  user_consent_deal_id: number;
  amount_offered: number;
};

type TSellConsentOfferPayload = {
  personal_data_field_id: any;
  amount: number | undefined;
  qunatity: number | undefined;
  consent_snapshot: number[];
};

type TTransactionDetails = {
  personal_data_field_id: number;
  seller_id?: string;
  amount: number;
  qunatity: number;
  status: string;
  user_consent_deal_id?: number;
  amount_offered?: number;
};

export const useConsentActions = () => {
  const { isLoading, setIsLoading } = useLoading();

  const getCompanyConsentsDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('api/company/user_consent_deals');
      setIsLoading(false);
      return data.data;
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  const getUserConsentsDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('api/user_consent_deals');
      setIsLoading(false);
      return data.data;
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeUserConsentDeal = useCallback(async (orderId: number) => {
    try {
      await api.delete(`api/user_consent_deals/${orderId}/`);
      toast.success('Order removed successfully');
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  const getConsentDealsById = useCallback(async (id: Number) => {
    try {
      const { data } = await api.get(`api/deal_offer?user_consent_deal_id=${id}`);
      return data;
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  const createBuyConsentOffer = useCallback(async (payload: TBuyConsentOfferPayload) => {
    try {
      const { data } = await api.post('api/deal_offer', payload);
      toast.success('Order Placed');
      return data;
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, []);

  const createSellConsentOffer = useCallback(async (payload: TSellConsentOfferPayload) => {
    try {
      const { data } = await api.post('api/user_consent_deals', payload);
      toast.success('Sell Updated');
      return data;
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, []);

  const updateBuyingConsenOffer = useCallback(async (id: number) => {
    try {
      const response = await api.patch(`api/deal_offer/${id}/`, {
        status: 'ACCEPTED',
      });

      if (response.status === 200) {
        toast.success('Order Updated');
        return response.data;
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  const sellConsentToInterestedCompany = useCallback(async (transactionDetails: TTransactionDetails) => {
    try {
      const { data } = await api.post('api/deal_transaction', transactionDetails);
      toast.success('Transaction Successfully Done');
      return data;
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  const getAvailableConsentUnitsToSell = useCallback(async (consentId: number) => {
    try {
      const { data } = await api.get(`api/available_data_to_sell/${consentId}/`);
      return data.data;
    } catch (error) {
      console.log('error :>> ', error);
    }
  }, []);

  return {
    getConsentDealsById,
    createBuyConsentOffer,
    getCompanyConsentsDeals,
    updateBuyingConsenOffer,
    sellConsentToInterestedCompany,
    getUserConsentsDeals,
    isLoading,
    createSellConsentOffer,
    removeUserConsentDeal,
    getAvailableConsentUnitsToSell,
  };
};
