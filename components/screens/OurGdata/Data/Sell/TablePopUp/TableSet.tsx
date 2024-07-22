import { Column, useTable } from 'react-table';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { LineChart } from '@/components/UI/LineChart2';
import { trade_icon, buy_icon, loader_icon } from '@/public/assets';
import Link from 'next/link';
import Image from 'next/image';
import { TransactionData, useBuyData } from '@/hooks/useBuy';
import Modals from 'components/UI/Modal';
import { useTableData } from "@/state/table/hook";

interface IProps {
    data: any;
    setSelectedRows: (rows: any[]) => void;
}

function TableSet({ data, setSelectedRows }: IProps) {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const { fetchTableData } = useTableData();
    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<{ [key: string]: boolean }>({});
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns: [
            {
                Header: '',
                accessor: 'checkbox',
                Cell: ({ row }: any) => (
                    <input
                        type="checkbox"
                        checked={selectedRowIds[row.id] || false}
                        onChange={() => {
                            setSelectedRowIds({
                                ...selectedRowIds,
                                [row.id]: !selectedRowIds[row.id],
                            });
                        }}
                    />
                ),
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
        ],
        data,
    });

    useEffect(() => {
        const selectedRows = rows.filter((row: any) => selectedRowIds[row.id]);
        setSelectedRows(selectedRows);
    }, [selectedRowIds, rows, setSelectedRows]);

    return (
        <>
            <table {...getTableProps()} className="w-full">
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${column.id === 'id' && 'hidden'
                                        }`}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any, rowIndex: number) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="even:bg-[#d4d4d4] dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                                {row.cells.map((cell: any) => (
                                    <td
                                        key={cell.id}
                                        {...cell.getCellProps()}
                                        className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black dark:text-main font-sans font-normal text-base mobile:text-sm text-center`}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default TableSet
