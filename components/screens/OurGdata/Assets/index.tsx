'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ASSETSDATACOLUMNS } from '@/constants/consent';
import { maxWidth, PRICE_DECIMAL_PLACES } from '@/constants';
import { Socket } from 'socket.io-client';
import useSocket from '@/hooks/useSocket';
import { usePortfolioStats } from '@/hooks/usePortfolioStats';
import ProfileChart from './ProfileChart';
import Table from './Table';
import { aggregateDataByDate, getIntervalFromSelectedValue } from '@/lib/charts';
import { useOurGData } from '@/state/ourGData/hooks';
import { useAuth } from '@/hooks/useAuth';
import { DATATIMETYPE } from '@/constants/our_g_data';



function Main() {
  const { consentAssetsData, setConsentAssetsData } = useOurGData()
  const [isLoading, setIsLoading] = useState(consentAssetsData.length === 0)
  const [sum, setSum] = useState(0);
  const [lineChartData, setLineChartData] = useState({});
  const { user } = useAuth()

  const { getPortfolioStats, calculateTotalSum, transformData } = usePortfolioStats();

  const { interval } = useMemo(() => getIntervalFromSelectedValue(DATATIMETYPE.YEAR), [])

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      // interval: [TODAY, YESTERDAY],
    });
    //user_id will be sent
    socket.emit('consent_line_chart_data', { interval });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_averages: async (data: any) => {
      const portfolioStats = await getPortfolioStats();
      if (data && data.data) {
        const consentAssets = transformData(data.data, portfolioStats);
        const totalSum = calculateTotalSum(consentAssets);
        setConsentAssetsData(consentAssets);
        setSum(totalSum);
      }
      setIsLoading(false)
    },
    consent_line_chart_data: (data: any) => {
      // console.log('Received data from get_line_chart_data -->', data.data);
      if (data && data.data) {
        const lineChartData = aggregateDataByDate(data.data)
        setLineChartData(lineChartData);
      }
    },
  }), [setConsentAssetsData, setSum, transformData, calculateTotalSum, getPortfolioStats]);

  useSocket('market_place', eventHandlers, onConnect);


  return (
    <div className={`w-full h-full overflow-auto scrollbar-transparent max-w-[${maxWidth}]`}>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center w-full">
          <div>
          <h1 className="text-3xl font-bold dark:text-white">{`$${sum.toFixed(PRICE_DECIMAL_PLACES)}`}</h1>
            <p className="text-xl font-semibold dark:text-white">Total Balance</p>
          </div>
        <div className="max-w-[400px]">
            <ProfileChart data={lineChartData} />
          </div>
        </div>
        <h1 className="text-3xl font-bold items-center flex mb-2 dark:text-white">Assets</h1>
      <Table data={consentAssetsData} columns={ASSETSDATACOLUMNS} isLoadingData={isLoading} />
    </div>
  );
}

export default Main;
