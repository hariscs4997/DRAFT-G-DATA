'use client';

import React, { useMemo } from 'react';
import { useMyGData } from '@/hooks/useMyGData';
import { maxWidth } from '@/constants';
import { MYGDATATABLECOLUMNS } from '@/constants/my_g_data';
import ScreenData from './ScreenData';
import Table from './components/Table';

function Main() {
  const { gData, gTableColumns } = useMyGData();
  const tableData = useMemo(
    () =>
      Object.entries(gData).map(([key, value]) => ({
        Consent: key,
        ...value,
      })),
    [gData],
  );
  return (
    <div className="flex flex-col gap-y-5 w-full h-full">
      <div className={`overflow-x-auto w-full max-w-[${maxWidth}] min-h-[50%]`}>
        <Table data={tableData} columns={gTableColumns.length > 0 ? gTableColumns : MYGDATATABLECOLUMNS} />
      </div>
      <ScreenData />
    </div>
  );
}

export default Main;
