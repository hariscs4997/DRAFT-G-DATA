export enum DATATIMETYPE {
  DAY = '1 DAY',
  FIFTEEN_HOURS = '15 HOURS',
  HOUR = '1 HOUR',
  FOUR_HOURS = '4 HOURS',
  YEAR = '1 YEAR',
}
export const DATATIMETYPESOPTIONS = [
  { label: DATATIMETYPE.DAY, value: DATATIMETYPE.DAY },
  { label: DATATIMETYPE.FIFTEEN_HOURS, value: DATATIMETYPE.FIFTEEN_HOURS },
  { label: DATATIMETYPE.HOUR, value: DATATIMETYPE.HOUR },
  { label: DATATIMETYPE.FOUR_HOURS, value: DATATIMETYPE.FOUR_HOURS },
  { label: DATATIMETYPE.YEAR, value: DATATIMETYPE.YEAR },
];

export const STATUSORDER: { [key: string]: number } = {
  pending: 1,
  interested: 2,
  purchased: 3,
};
