import { Column } from 'react-table';
import { Columns } from '@/types';

export const PAGEOPTION = [10, 20, 30, 40];
export const HISTORYDATATABLECOLUMNS: Column<Columns>[] = [
  {
    Header: 'Questions',
    accessor: 'question' as keyof Columns,
  },
  {
    Header: 'Answers',
    accessor: 'answer' as keyof Columns,
  },
  {
    Header: 'Image',
    accessor: 'images' as keyof Columns,
  },
  {
    Header: 'Feedback',
    accessor: 'choice' as keyof Columns,
  },
];
