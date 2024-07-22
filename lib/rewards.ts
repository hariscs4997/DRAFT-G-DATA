/* eslint-disable no-restricted-syntax */

//* rewards table
export const createRewardsTableState = (data: any) => {
  const result: {
    [key: string]: {
      consents_to_sell: boolean;
      demanded_reward_value: string;
      id: string;
    };
  } = {};
  for (const d of data) {
    result[d.PDataAndScreen] = {
      consents_to_sell: d.Consent === 'TRUE',
      demanded_reward_value: d.PDefinedValue,
      id: d.id,
    };
  }
  return result;
};
