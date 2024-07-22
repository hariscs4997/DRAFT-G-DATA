'use client';

import React, { useMemo } from 'react';
import { maxWidth } from '@/constants';
import { PERSONALDATATABLECOLUMNS } from '@/constants/personal_data';
import { useMyGData } from '@/hooks/useMyGData';
import NoData from '@/components/UI/NoDataMessage';
import Table from './Table';
import SidePanel from './SidePanel';

function Main() {
  const { savePersonalData, isLoading, personalData } = useMyGData();
  const tableData = useMemo(
    () =>
      Object.entries(personalData).map(([key, value]) => ({
        ...value,
        date: key,
      })),
    [personalData],
  );
  return (
    <div className="flex flex-row gap-x-2 w-full overflow-hidden h-full mobile:flex-col-reverse">
      <SidePanel savePersonalData={savePersonalData} isLoading={isLoading} />
      <div className={`overflow-x-auto w-full h-full mobile:min-h-[350px] max-w-[${maxWidth}]`}>
        <Table data={tableData} columns={PERSONALDATATABLECOLUMNS} />
        {tableData.length === 0 && <NoData />}
      </div>
    </div>
  );
}
export default Main;
