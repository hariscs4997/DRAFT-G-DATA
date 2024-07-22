import React, { useEffect, useState } from 'react';
import { Column, useTable } from 'react-table';
import { Columns } from '@/types';
import Actions from '@/components/screens/MyGData/Actions';
import { createRewardsTableState } from '@/lib/rewards';
import { UpdateConsentRewardType } from '@/state/myGData/types';
import Input from '../../components/Input';

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
  const [PDefinedValue, setPDefinedValue] = useState<{
    [key: string]: {
      consents_to_sell: boolean;
      demanded_reward_value: string;
      id: string;
    };
  }>({});
  const [recordName, setRecordName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (!/^\d*\.?\d*$/.test(value)) return;
    const fieldName = name.split('-')[0];

    setPDefinedValue((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        demanded_reward_value: value,
      },
    }));
    setRecordName(fieldName);
  };
  const handleButtonClick = () => {
    if (!recordName) return;
    updateConsentRewards({
      id: Number(PDefinedValue[recordName].id),
      payload: {
        demanded_reward_value: parseFloat(PDefinedValue[recordName].demanded_reward_value),
        consents_to_sell: PDefinedValue[recordName].consents_to_sell,
      },
    });
    setRecordName('');
  };
  // debouncing
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (!recordName) return;
  //     updateConsentRewards({
  //       id: Number(PDefinedValue[recordName].id),
  //       payload: {
  //         demanded_reward_value: parseFloat(PDefinedValue[recordName].demanded_reward_value),
  //         consents_to_sell: PDefinedValue[recordName].consents_to_sell,
  //       },
  //     });
  //     setRecordName('');
  //   }, 2000);

  //   return () => clearTimeout(timeout);
  // }, [PDefinedValue, recordName, updateConsentRewards]);

  useEffect(() => {
    setPDefinedValue(createRewardsTableState(data));
  }, [data]);

  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, columnIndex: number) => (
              <th
                {...column.getHeaderProps()}
                className={`border-table border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${
                  columnIndex === headerGroup.headers.length - 1 && 'hidden'
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
              {row.cells.map((cell: any, cellIndex: number) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className={`border border-[#ced4da] py-6 px-7 mobile:p-3 dark:text-main text-black font-sans font-normal text-base mobile:text-sm text-center whitespace-nowrap ${
                    cell.column.id === 'id' && 'hidden'
                  } 
                
                  `}
                >
                  {(cellIndex === 0 || cellIndex === 1) && cell.render('Cell')}
                  {cell.column.id === 'Consent' && (
                    <Actions
                      isAllowed={row.values.Consent !== 'FALSE'}
                      isDisabled={row.values.id === null}
                      onClick={() =>
                        updateConsentRewards({
                          id: row.values.id,
                          payload: {
                            consents_to_sell: row.values.Consent !== 'TRUE',
                          },
                        })
                      }
                    />
                  )}
                  {cell.column.id === 'PDefinedValue' && (
                    <Input
                      name={`${row.values.PDataAndScreen}-${row.values.id}`}
                      id={row.values.id}
                      type="text"
                      pattern="\d*\.?\d*"
                      readOnly={row.values.Consent === 'FALSE'}
                      isMonetaryInput
                      value={PDefinedValue[row.values.PDataAndScreen]?.demanded_reward_value}
                      onChange={handleChange}
                      onclick={handleButtonClick}
                    />
                  )}
                  {cell.column.id === 'OtherCompValue' && (
                    <Input
                      name={`OtherCompValue-${row.values.id}`}
                      id={`OtherCompValue-${row.values.id}`}
                      readOnly
                      isMonetaryInput
                      value={row.values.OtherCompValue}
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
