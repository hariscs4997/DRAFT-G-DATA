/* eslint-disable consistent-return */
import { useLoading } from '@/state/loading/hooks';
import { useCallback } from 'react';
import { api } from '@/config';
import { SellData } from '@/state/sell';

type DataField = {
  field_name: String;
  average_price: number;
  change: any;
}[];

export type TransformData = {
  name: String;
  price: Number;
  quantity: number;
  total: number;
};

export function usePortfolioStats() {
  const { isLoading, setIsLoading } = useLoading();

  const getPortfolioStatsForConsent = useCallback(
    async (name: any) => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`api/portfolio_stats/?consent_id=${name.id}`);
        return data.data;
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );
  const getPortfolioStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('api/portfolio_stats/');
      return data.data;
    } catch (error) {
      // console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const calculateTotalSum = useCallback((data: TransformData[]) => {
    let totalSum = 0;
    data.forEach((item) => {
      totalSum += item.total;
    });
    return totalSum;
  }, []);

  const transformData = useCallback((dataFields: DataField, dataConsent: SellData[]): TransformData[] => {
    const transformedData: TransformData[] = [];
    dataConsent.forEach((consentData) => {
      dataFields.forEach((fieldData) => {
        if (consentData.consent_name === fieldData.field_name && consentData.available_data_count !== 0) {
          transformedData.push({
            name: consentData.consent_name,
            price: fieldData.average_price,
            quantity: consentData.available_data_count,
            total: fieldData.average_price * consentData.available_data_count,
          });
        }
      });
    });
    return transformedData;
  }, []);

  return {
    isLoading,
    getPortfolioStatsForConsent,
    getPortfolioStats,
    calculateTotalSum,
    transformData,
  };
}
