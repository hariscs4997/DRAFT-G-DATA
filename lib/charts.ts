import moment from 'moment';

export const getIntervalFromSelectedValue = (
  selectedTimeRange: string,
): {
  numOfHour: number;
  interval: string[];
} => {
  if (selectedTimeRange === '1 YEAR') {
    return {
      numOfHour: 24,
      interval: [moment().subtract(1, 'year').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 00:00:00')],
    };
  }
  if (selectedTimeRange === '1 DAY') {
    return {
      interval: [moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 00:00:00')],
      numOfHour: 24,
    };
  }
  if (selectedTimeRange === '4 HOURS') {
    return {
      interval: [moment().subtract(4, 'hours').format('YYYY-MM-DD HH:00:00'), moment().format('YYYY-MM-DD HH:00:00')],
      numOfHour: 4,
    };
  }
  if (selectedTimeRange === '15 HOURS') {
    return {
      interval: [moment().subtract(15, 'hours').format('YYYY-MM-DD HH:mm:00'), moment().format('YYYY-MM-DD HH:mm:00')],
      numOfHour: 15,
    };
  }
  if (selectedTimeRange === '1 HOURS') {
    return {
      interval: [moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')],
      numOfHour: 1,
    };
  }
  return {
    interval: [moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 00:00:00')],
    numOfHour: 24,
  };
};
