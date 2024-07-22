import { TDropdownOption } from '@/types';

export type TConsentTableState = {
  [key: string]: {
    use: { [key: string]: string };
    pricing: { [key: string]: string };
    threshold: { [key: string]: number };
  };
};

/* eslint-disable no-restricted-syntax */
export const createConsentTableState = (
  tableData: {
    PDataAndWeb: string;
    Companies: TDropdownOption;
    Use: { [key: string]: string };
    Pricing: { [key: string]: string };
    Threshold: { [key: string]: number };
  }[],
) => {
  const result: TConsentTableState = {};
  for (const d of tableData) {
    result[d.PDataAndWeb] = {
      use: d.Use,
      pricing: d.Pricing,
      threshold: d.Threshold,
    };
  }
  return result;
};

export const createFieldToCompanyMapping = (
  tableData: {
    PDataAndWeb: string;
    Companies: { label: string; value: string }[];
  }[],
) => {
  const result: { [key: string]: string } = {};
  for (const d of tableData) {
    result[d.PDataAndWeb] = d.Companies.length > 0 ? d.Companies[0].value : '';
  }

  return result;
};

export const createCompanyToFieldMapping = ({
  fieldName,
  data,
}: {
  fieldName: 'usage' | 'demanded_reward_value' | 'threshold';
  data: {
    first_name: string;
    usage: string;
    demanded_reward_value: string;
    threshold: number;
  }[];
}) => {
  const result: { [key: string]: string } = {};
  for (const d of data) {
    result[d.first_name] = d[fieldName]?.toString();
  }
  return result;
};

export const createCompaniesDropdown = (data: any): TDropdownOption[] => {
  const result: TDropdownOption[] = [];
  for (const d of data) {
    if (d.consents_to_buy && d.first_name) {
      result.push({ label: d.first_name, value: d.first_name });
    }
  }
  return result;
};
