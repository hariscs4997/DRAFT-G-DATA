/* eslint-disable consistent-return */
import { useLoading } from '@/state/loading/hooks';
import { useCallback, useState } from 'react';
import { api } from '@/config';

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
  const [isLoadingConsent, setIsLoadingConsent] = useState(false);

  const getPortfolioStatsForConsent = useCallback(
    async (id: number) => {
      setIsLoadingConsent(true);
      try {
        const { data } = await api.get(`api/portfolio_stats/?consent_id=${id}`);
        return data.data;
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoadingConsent(false);
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

  const transformData = useCallback((dataFields: DataField, dataConsent: any): TransformData[] => {
    const transformedData: TransformData[] = [];
    dataConsent.forEach((consentData: any) => {
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
    isLoadingConsent,
  };
}
