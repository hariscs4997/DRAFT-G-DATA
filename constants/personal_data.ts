import { Column } from 'react-table';
import { PersonalDataSchemaType } from '@/schema';
import { Columns, TDropdownOption } from '@/types';

export const SOCIALLIFEOPTIONS: TDropdownOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
export const PERSONALDATAINITIALVALUES: PersonalDataSchemaType = {
  date: '',
  high_temperature: 0,
  low_temperature: 0,
  emotional_list: [],
  emotional_overall: '',
  weather: '',
  relative_finance_status: '',
  exercise_time: 0,
  any_social_life: SOCIALLIFEOPTIONS[0].value,
};

export const PERSONALDATATABLECOLUMNS: Column<Columns>[] = [
  {
    Header: 'Date',
    accessor: 'date' as keyof Columns, // accessor is the "key" in the data
  },

  {
    Header: 'High Temperature',
    accessor: 'high_temperature' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Low Temperature',
    accessor: 'low_temperature' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Weather Type',
    accessor: 'weather' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Emotional List',
    accessor: 'emotional_list' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Emotional Overall',
    accessor: 'emotional_overall' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Relative Finance Status',
    accessor: 'relative_finance_status' as keyof Columns, // accessor is the "key" in the data
  },

  {
    Header: 'Exercise Total Time',
    accessor: 'exercise_time' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Photos',
    accessor: 'photos' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Health Overall',
    accessor: 'health_overall' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Any Social Life',
    accessor: 'any_social_life' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Social Life List',
    accessor: 'social_life_list' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Weight',
    accessor: 'weight' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Family Status',
    accessor: 'family_status' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Device Screen Time',
    accessor: 'device_screen_time' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Work Life Balance',
    accessor: 'work_life_balance' as keyof Columns, // accessor is the "key" in the data
  },
  {
    Header: 'Journaling',
    accessor: 'journaling' as keyof Columns, // accessor is the "key" in the data
  },
];
