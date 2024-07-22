import { Column, useTable } from 'react-table';
import React, { useCallback, useEffect, useState } from 'react';
import { Columns, UpdateCompanyConsentPayload } from '@/types';
import Actions from '@/components/screens/MyGData/Actions';
import Input from '@/components/screens/MyGData/components/Input';
import Textarea from '@/components/screens/MyGData/components/Textarea';
import { createCompanyState } from '@/lib';
import { UpdateConsentCompanyType } from '@/state/myGData/types';

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
  };

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
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (!recordID) return;
  //     updateConsentRewards([
  //       {
  //         demanded_reward_value: Number(values[recordID].pricing),
  //         usage: values[recordID].use,
  //         threshold: Number(values[recordID].threshold),
  //         personal_data_field: {
  //           field_name: recordID,
  //         },
  //       },
  //     ]);
  //     setRecordID('');
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [values, recordID, updateConsentRewards]);
  const handleButtonClick = () => {
    if (!recordID) return;
    updateConsentRewards([
      {
        demanded_reward_value: Number(values[recordID].pricing),
        usage: values[recordID].use,
        threshold: Number(values[recordID].threshold),
        personal_data_field: {
          field_name: recordID,
        },
      },
    ]);
  };
  useEffect(() => {
    setValues(createCompanyState(data));
  }, [data]);

  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
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
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell: any, cellIndex: number) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 bg-active dark:bg-darkChat text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center 
                  ${cellIndex === row.cells.length - 1 && 'hidden'}
                  ${(cellIndex === 1 || cellIndex === 2) && 'min-w-[450px]'}
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
                    <Textarea
                      name={`Use-${row.values.fieldName}`}
                      readOnly={row.values.Consent === 'FALSE'}
                      value={values[row.values.fieldName] ? values[row.values.fieldName].use : ''}
                      onChange={(e) => handleChange(e, 'use')}
                      className="min-w-[200px]"
                      onClick={() => {}}
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
                      onclick={handleButtonClick}
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
                      onclick={handleButtonClick}
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
