import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import close_icon from '@/public/icons/close_icon.png';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';
import Button from '@/components/UI/Button';

interface IProp {
    data2: any;
    openModal: boolean | undefined;
    isClose: () => void;
}

function TablePopUp({ data2, openModal, isClose }: IProp) {
    const [selectedRowIds, setSelectedRowIds] = useState<{ [key: string]: boolean }>({});
    const { theme } = useTheme();

    const columns: any = React.useMemo(
        () => [
            {
                Header: 'Select',
                accessor: 'checkbox',
                Cell: ({ row }: any) => (
                    <input
                        type="checkbox"
                        checked={selectedRowIds[row.id] || false}
                        className="w-5 h-5 "
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
        [selectedRowIds],
    );
    const generateDataArray = (dataInfo: { available_data_count: any; consent_name: any; }) => {
        const { available_data_count, consent_name } = dataInfo;
        const data = [];

        for (let i = 0; i < available_data_count; i++) {
            data.push({
                date: '1/12/2024',
                name: consent_name.toLowerCase(),
                checkbox: 'checkbox',
            });
        }

        return data;
    };
    const data = generateDataArray(data2);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    useEffect(() => {
        const selectedRows = rows.filter((row: any) => selectedRowIds[row.id]);
    }, [selectedRowIds, rows]);

    const bg = {
        content: {
            background: theme === 'dark' ? '#454545' : 'white',
            overflow: 'auto',
            maxWidth: 'content-fit',
        },
    };

    const handleGetSelectedRows = () => {
        const selectedRows = rows.filter((row: any) => selectedRowIds[row.id]);
        console.log('Selected Rows:', selectedRows);
    };

    return (
        <div className="p-5">
            <Modal
                isOpen={openModal || false}
                onRequestClose={isClose}
                shouldCloseOnOverlayClick
                style={bg}

            >
                <div className="mx-auto rounded-md">
                    <div
                        onClick={isClose}
                        className="-mt-6 float-right w-4 h-4 cursor-pointer"
                    >
                        <Image src={close_icon} alt="close" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
                    </div>

                    <table {...getTableProps()} className="w-full">
                        <thead>
                            {headerGroups.map((headerGroup: any) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column: any) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap"
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
                                    <tr {...row.getRowProps()} className="even:bg-[#d4d4d4] dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                                        {row.cells.map((cell: any) => (
                                            <td
                                                key={cell.id}
                                                {...cell.getCellProps()}
                                                className="border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black dark:text-main font-sans font-normal text-base mobile:text-sm text-center"
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4 gap-x-5">
                        <Button onClick={handleGetSelectedRows} className="bg-yellow w-full disabled:bg-disabledBlue max-w-[250px]" title="Save" />
                        <Button onClick={isClose} className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]" title="Close" />

                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TablePopUp;
