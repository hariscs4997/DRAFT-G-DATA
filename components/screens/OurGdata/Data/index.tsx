'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { maxWidth, TODAY, YESTERDAY } from '@/constants';
import { DATATABLECOLUMNS } from '@/constants/consent';
import { DatatableType } from '@/types';
import Skeleton from '@/components/UI/LazyLoader';
import useSocket from '@/hooks/useSocket';
import { Socket } from 'socket.io-client';
import Table from './Table';


function Main() {
  const [tableData, setTableData] = useState<DatatableType>([]);


  const onConnect = useCallback((socket: Socket) => {
    socket.emit('consent_averages', {
      interval: [TODAY, YESTERDAY],
    });
  }, []);

  const eventHandlers = useMemo(() => ({
    consent_averages: (data: any) => {
      if (data && data.data) {
        setTableData(
          data.data.map((item: any) => ({
            name: item.field_name,
            price: item.average_price,
          })),
        );
      }
    },
  }), []);


  useSocket('market_place', eventHandlers, onConnect);

  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      {tableData.length === 0 ? <Skeleton /> : <Table data={tableData} columns={DATATABLECOLUMNS} />}
    </div>
  );
}
export default Main;