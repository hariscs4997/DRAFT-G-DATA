import { TODAY } from '@/constants';
import moment from 'moment';

export const getIntervalFromSelectedValue = (
  selectedTimeRange: string,
): {
  numOfHour: number;
  interval: string[];
  relativeInterval: 'd' | 'm' | 'y' | 'h';
} => {
  if (selectedTimeRange === '1 YEAR') {
    return {
      numOfHour: 8766,
      interval: [moment().subtract(1, 'year').format('YYYY-MM-DD 00:00:00'), TODAY],
      relativeInterval: 'y',
    };
  }
  if (selectedTimeRange === '1 DAY') {
    return {
      interval: [moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), TODAY],
      numOfHour: 24,
      relativeInterval: 'd',
    };
  }
  if (selectedTimeRange === '4 HOURS') {
    return {
      interval: [moment().subtract(4, 'hours').format('YYYY-MM-DD HH:00:00'), moment().format('YYYY-MM-DD HH:00:00')],
      numOfHour: 4,
      relativeInterval: 'h',
    };
  }
  if (selectedTimeRange === '15 HOURS') {
    return {
      interval: [moment().subtract(15, 'hours').format('YYYY-MM-DD HH:mm:00'), moment().format('YYYY-MM-DD HH:mm:00')],
      numOfHour: 15,
      relativeInterval: 'h',
    };
  }
  if (selectedTimeRange === '1 HOURS') {
    return {
      interval: [moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')],
      numOfHour: 1,
      relativeInterval: 'h',
    };
  }
  return {
    interval: [moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), TODAY],
    numOfHour: 24,
    relativeInterval: 'h',
  };
};

export const aggregateDataByDate = (data: {
  [key: string]: { interval_start: string; average_price: number; field_name: string }[];
}) => {
  const aggregatedData: { [key: string]: number } = {};
  for (const category in data) {
    const records = data[category];
    for (const record of records) {
      const { interval_start, average_price } = record;
      if (!aggregatedData[interval_start]) {
        aggregatedData[interval_start] = 0;
      }
      aggregatedData[interval_start] += average_price;
    }
  }
  return aggregatedData;
};