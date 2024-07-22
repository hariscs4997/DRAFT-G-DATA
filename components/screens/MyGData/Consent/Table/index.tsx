/* eslint-disable no-nested-ternary */
import { Column, useTable } from 'react-table';
import React, { useCallback, useEffect, useState } from 'react';
import { Columns } from '@/types';
import Actions from '@/components/screens/MyGData/Actions';
import Input from '@/components/screens/MyGData/components/Input';
import { UpdateConsentRewardType } from '@/state/myGData/types';
import Select from '@/components/UI/Select';
import { TConsentTableState, createConsentTableState, createFieldToCompanyMapping } from '@/lib/consent';

interface IProps {
  data: any;
  columns: Column<Columns>[];
  updateConsentRewards: (arg: { id: number; payload: UpdateConsentRewardType }) => void;
}

function Table({ columns, data, updateConsentRewards }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const [mappedValues, setMappedValues] = useState<TConsentTableState>({});
  const [selectedCompany, setSelectedCompany] = useState<{ [key: string]: string }>({});

  const handleChange = useCallback((field: string, item: string) => {
    setSelectedCompany((prev) => ({ ...prev, [field]: item }));
  }, []);
  const getCellValue = useCallback(
    (field: string, cellName: 'use' | 'pricing' | 'threshold') => {
      if (!mappedValues[field]) return '';
      return mappedValues[field][cellName][selectedCompany[field]];
    },
    [mappedValues, selectedCompany],
  );

  useEffect(() => {
    setSelectedCompany(createFieldToCompanyMapping(data));
    setMappedValues(createConsentTableState(data));
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
                  column.id === 'id' && 'hidden'
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
            <tr {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
              {row.cells.map((cell: any) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center
                  ${cell.column.id === 'id' && 'hidden'}
                  ${(cell.column.id === 'Definition' || cell.column.id === 'Unit') && 'min-w-[450px]'}
                  ${(cell.column.id === 'Companies' || cell.column.id === 'Use') && 'min-w-[200px]'}
                  `}
                >
                  {cell.column.id === 'Consent' ? (
                    <Actions
                      isAllowed={row.values.Consent !== 'FALSE'}
                      isDisabled={row.values.id === null}
                      onClick={() => {
                        updateConsentRewards({
                          id: row.values.id,
                          payload: {
                            consents_to_sell: row.values.Consent !== 'TRUE',
                          },
                        });
                      }}
                    />
                  ) : cell.column.id === 'Companies' && row.values.Companies.length > 0 ? (
                    <Select
                      options={row.values.Companies}
                      onClick={(item: string) => {
                        handleChange(row.values.PDataAndWeb, item);
                      }}
                      className="w-full"
                      value={selectedCompany[row.values.PDataAndWeb] ?? ''}
                    />
                  ) : cell.column.id === 'Use' || cell.column.id === 'Threshold' ? (
                    <p>{getCellValue(row.values.PDataAndWeb, cell.column.id.toLowerCase())}</p>
                  ) : cell.column.id === 'Pricing' ? (
                    <Input
                      name={`price-offer-${row.values.id}`}
                      id={`price-offer-${row.values.id}`}
                      className="min-w-[160px]"
                      readOnly
                      isMonetaryInput
                      value={getCellValue(row.values.PDataAndWeb, 'pricing')}
                    />
                  ) : (
                    cell.render('Cell')
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
