'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ASSETSDATACOLUMNS } from '@/constants/consent';
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { Socket } from 'socket.io-client';
import useSocket from '@/hooks/useSocket';
import { usePortfolioStats } from '@/hooks/usePortfolioStats';
import ProfileChart from './ProfileChart';
import Table from './Table';
import { getIntervalFromSelectedValue } from '@/lib/charts';
import { useOurGData } from '@/state/ourGData/hooks';



function Main() {
  const { consentAssetsData, setConsentAssetsData } = useOurGData()
  const [isLoading, setIsLoading] = useState(consentAssetsData.length === 0)
  const [sum, setSum] = useState(0);
  const [lineChartData, setLineChartData] = useState<any>([]);

  const { getPortfolioStats, calculateTotalSum, transformData } = usePortfolioStats();

  const { interval } = useMemo(() => getIntervalFromSelectedValue('1 DAY'), [])

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
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
      console.log('Received data from consent_line_chart_data -->', data.data);
      if (data && data.data) {
        // const formattedData = TITLE && data.data[TITLE].map((item: any) => ({
        //   x: item.created_at,
        //   y: item.amount,
        //   type: 'scatter',
        //   mode: 'lines+markers',
        //   marker: { color: 'red' },
        // }));
        // setLineChartData(formattedData);
      }
    },
  }), [setConsentAssetsData, setSum, transformData, calculateTotalSum, getPortfolioStats]);

  useSocket('market_place', eventHandlers, onConnect);


  return (
    <div className="w-full h-full overflow-x-auto">
      <div className={`overflow-y-auto scrollbar-transparent w-full max-w-[${maxWidth}]`}>
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{`$${sum}`}</h1>
            <p className="text-xl font-semibold dark:text-white">Total Balance</p>
          </div>
          <div className="min-w-[300px] mx-2 my-6">
            <ProfileChart data={lineChartData} />
          </div>
        </div>
        <h1 className="text-3xl font-bold items-center flex mb-2 dark:text-white">Assets</h1>
        <Table data={consentAssetsData} columns={ASSETSDATACOLUMNS} isLoadingData={isLoading} />
      </div>
    </div>
  );
}

export default Main;
