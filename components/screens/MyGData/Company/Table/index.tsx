import { Column, useTable } from 'react-table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Columns, TOptions, UpdateCompanyConsentPayload } from '@/types';
import Actions from '@/components/screens/MyGData/Actions';
import Input from '@/components/screens/MyGData/components/Input';
import { createCompanyState } from '@/lib';
import { UpdateConsentCompanyType } from '@/state/myGData/types';
import { CONSENTUSECASES } from '@/constants/consent';
import MultiSelect from '@/components/UI/MultiSelect';
import { MultiValue } from 'react-select';
import _ from 'lodash'
interface IProps {
  data: any;
  columns: Column<Columns>[];
  updateConsentRewards: (payload: UpdateCompanyConsentPayload) => void;
}

function Table({ columns, data, updateConsentRewards }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const [values, setValues] = useState<{
    [key: string]: UpdateConsentCompanyType;
  }>({});
  const [recordID, setRecordID] = useState('');
  //using refs because not getting updated values in debounce
  const recordIDRef = useRef(recordID);
  const valuesRef = useRef(values); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    field: 'use' | 'pricing' | 'threshold',
  ) => {
    const { value, id, type } = e.target;
    const fieldName = id.split('-')[1];
    if (type === 'number' && /^\d*\.?\d*$/.test(value) === false) return;
    setValues((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        [field]: value,
      },
    }));
    setRecordID(fieldName);
    handleConsentRewardsUpdateDebounced()

  };

  const handleSelectUseCase = (newValue: MultiValue<TOptions>, fieldName: string) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        ['use']: newValue,
      },
    }));
    setRecordID(fieldName);
    handleConsentRewardsUpdateDebounced()

  }
  const handleConsetUpdate = useCallback(
    (name: string) => {
      const recordConsent = values[name].consents_to_buy;
      updateConsentRewards([
        {
          consents_to_buy: !recordConsent,
          personal_data_field: {
            field_name: name,
          },
        },
      ]);
    },
    [updateConsentRewards, values],
  );

  //call the update function (server) when use cases are updated
  const handleConsentRewardsUpdateDebounced = useCallback(
    _.debounce(() => {
      handleConsentRewardsUpdate();
    }, 1000),
    []
  );
  const handleConsentRewardsUpdate = () => {
    const latestRecordID = recordIDRef.current;
    const latestValues = valuesRef.current;
    if (!latestRecordID) return;
    updateConsentRewards([
      {
        demanded_reward_value: Number(latestValues[latestRecordID].pricing),
        usage: latestValues[latestRecordID].use.map((usecase) => usecase.value).join(','),
        threshold: Number(latestValues[latestRecordID].threshold),
        personal_data_field: {
          field_name: latestRecordID,
        },
      },
    ]);
  };
  useEffect(() => {
    const { result } = createCompanyState(data)
    setValues(result);
  }, [data]);

  // Update refs whenever recordID or values change
  useEffect(() => {
    recordIDRef.current = recordID;
    valuesRef.current = values;
  }, [recordID, values]);


  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup: any, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps()}
                className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${
                  column.id === 'fieldName' && 'hidden'
                }`}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell: any, cellIndex: number) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 bg-active dark:bg-darkChat text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center 
                  ${cellIndex === row.cells.length - 1 && 'hidden'}
                  ${(cellIndex === 1 || cellIndex === 2) && 'min-w-[450px]'}
                  ${cell.column.id === 'Use' && 'max-w-[250px]'}
                  `}
                >
                  {(cellIndex === 0 || cellIndex === 1 || cellIndex === 2) && cell.render('Cell')}
                  {cell.column.id === 'Consent' && (
                    <Actions
                      isAllowed={row.values.Consent !== 'FALSE'}
                      onClick={() => {
                        handleConsetUpdate(row.values.fieldName);
                      }}
                    />
                  )}
                  {cell.column.id === 'Use' && (
                    <MultiSelect
                      name={`Use-${row.values.fieldName}`}
                      options={CONSENTUSECASES}
                      onChange={
                        (newValue) => handleSelectUseCase(newValue, row.values.fieldName)
                      }
                      values={values[row.values.fieldName] ? values[row.values.fieldName].use : []}
                      isDisabled={row.values.Consent === 'FALSE'}
                    />

                  )}
                  {cell.column.id === 'Pricing' && (
                    <Input
                      name={`Pricing-${row.values.fieldName}`}
                      readOnly={row.values.Consent === 'FALSE'}
                      type="text"
                      isMonetaryInput
                      pattern="\d*\.?\d*"
                      value={values[row.values.fieldName] ? values[row.values.fieldName].pricing : ''}
                      onChange={(e) => handleChange(e, 'pricing')}
                      className="min-w-[160px]"
                    />
                  )}
                  {cell.column.id === 'Threshold' && (
                    <Input
                      name={`Threshold-${row.values.fieldName}`}
                      readOnly={row.values.Consent === 'FALSE'}
                      type="text"
                      pattern="\d*\.?\d*"
                      value={values[row.values.fieldName] ? values[row.values.fieldName].threshold : ''}
                      onChange={(e) => handleChange(e, 'threshold')}
                      className="min-w-[160px]"
                    />
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
