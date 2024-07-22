'use client';

import React, { useMemo } from 'react';
import { maxWidth } from '@/constants';
import { COMPANYTABLECOLUMNS } from '@/constants/company';
import { useMyGData } from '@/hooks/useMyGData';
import NoData from '@/components/UI/NoDataMessage';
import Table from './Table';

function Main() {
  const { compData, updateCompanyConsentRewards } = useMyGData();

  const tableData = useMemo(
    () =>
      Object.entries(compData).map(([key, value]) => ({
        PDataAndWeb: key,
        ...value,
      })),
    [compData],
  );
  return (
    <div className={`overflow-x-auto w-full h-full max-w-[${maxWidth}]`}>
      <Table data={tableData} columns={COMPANYTABLECOLUMNS} updateConsentRewards={updateCompanyConsentRewards} />
      {tableData.length === 0 && <NoData />}
    </div>
  );
}
export default Main;
