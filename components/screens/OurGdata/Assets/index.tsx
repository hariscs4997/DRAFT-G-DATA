'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [totalAssetsBalance, setTotalAssetsBalance] = useState(0);
  const [lineChartData, setLineChartData] = useState({});
  const { user } = useAuth()

  const { getPortfolioStats, processPortfolioStats } = usePortfolioStats();

  const { interval } = useMemo(() => getIntervalFromSelectedValue(DATATIMETYPE.YEAR), [])

  const onConnect = useCallback((socket: Socket) => {

    socket.emit('consent_line_chart_data', { interval, user_id: user?.id });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_line_chart_data: (data: any) => {
      if (data && data.data) {
        const aggregatedData: { [key: string]: number } = {};
        data.data.map((item: any) => {
          aggregatedData[item.date] = item.current_valuation
        })
        setLineChartData({ ...aggregatedData });
      }
    },
  }), []);

  useSocket(`market_place?user_id=${user?.id}`, eventHandlers, onConnect);

  useEffect(() => {
    getPortfolioStats().then((data) => {
      const { totalAssetsValue, consentAssets } = processPortfolioStats(data);
      setConsentAssetsData(consentAssets);
      setTotalAssetsBalance(totalAssetsValue);
      if (isLoading) setIsLoading(false)
    });
  }, [])


  return (
    <div className={`w-full h-full overflow-auto scrollbar-transparent max-w-[${maxWidth}]`}>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center w-full">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{`$${totalAssetsBalance.toFixed(PRICE_DECIMAL_PLACES)}`}</h1>
          <p className="text-xl font-semibold dark:text-white">Total Balance</p>
        </div>
        <div className="max-w-[400px]">
          <ProfileChart data={lineChartData} />
        </div>
      </div>
      <h1 className="text-3xl font-bold items-center flex mb-2 dark:text-white">Assets</h1>
      <Table data={consentAssetsData} isLoadingData={isLoading} />
    </div>
  );
}

export default Main;