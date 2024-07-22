'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ASSETSDATACOLUMNS } from '@/constants/consent';
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { Socket } from 'socket.io-client';
import useSocket from '@/hooks/useSocket';
import { TransformData, usePortfolioStats } from '@/hooks/usePortfolioStats';
import ProfileChart from './profileChart';
import Table from './Table';



function Main() {

  const [tableData, setTableData] = useState<TransformData[]>();
  const [sum, setSum] = useState(0);
  const { getPortfolioStats, calculateTotalSum, transformData } = usePortfolioStats();

  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_averages: async (data: any) => {
      const portfolioStats = await getPortfolioStats();
      if (data && data.data) {
        const transformedData = transformData(data.data, portfolioStats);
        const totalSum = calculateTotalSum(transformedData);
        setTableData(transformedData);
        setSum(totalSum);
      }
    },
  }), [setTableData, setSum, transformData, calculateTotalSum, getPortfolioStats]);

  useSocket('market_place', eventHandlers, onConnect);


  return (
    <div className="flex flex-col gap-y-5 w-full h-full">
      <div className={`overflow-x-auto w-full max-w-[${maxWidth}] min-h-[50%]`}>
        <div className="flex justify-between items-center w-full gap-y-1">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{`$${sum}`}</h1>
            <p className="text-xl font-semibold dark:text-white">Total Balance</p>
          </div>
          <div className="min-w-[300px] mx-2 my-6">
            <ProfileChart />
          </div>
        </div>
        <h1 className="text-3xl font-bold items-center flex mb-2 dark:text-white">Assets</h1>
        {tableData && <Table data={tableData} columns={ASSETSDATACOLUMNS} />}
      </div>
    </div>
  );
}

export default Main;
