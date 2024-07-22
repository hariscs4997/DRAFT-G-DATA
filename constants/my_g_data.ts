import { Column } from 'react-table';
import { Columns } from '@/types';

export const MYGDATATABLECOLUMNS: Column<Columns>[] = [
  {
    Header: 'Consents',
    accessor: 'consents' as keyof Columns, // accessor is the "key" in the data
  },

  {
    Header: '08-13-2023',
    accessor: 'date1' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: '08-14-2023',
    accessor: 'date2' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: '08-15-2023',
    accessor: 'date3' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: '08-16-2023',
    accessor: 'date4' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: '08-17-2023',
    accessor: 'date5' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Consent Value',
    accessor: 'consentValue' as keyof Columns, // accessor is the "key" in the data
  },

  {
    Header: 'Rewards',
    accessor: 'rewards' as keyof Columns, // accessor is the "key" in the data
  },
];
