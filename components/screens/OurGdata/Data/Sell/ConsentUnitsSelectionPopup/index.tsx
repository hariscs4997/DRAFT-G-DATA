import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import { close_icon } from '@/public/assets';
import Button from '@/components/UI/Button';
import IconButton from '@/components/UI/IconButton';

interface IProp {
    isOpen: boolean
    onClose: () => void;
    consentId: number
}

function ConsentUnitsSelectionPopup({ isOpen, onClose }: IProp) {

    const [consentUnitsData, setConsentUnitsData] = useState([])
    const [selectedConsentUnits, setSelectedConsentUnits] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false)

    const { rows, getTableBodyProps, getTableProps, headerGroups, prepareRow } = useTable({
        data: [],
        columns: []
    })

    const handleSave = () => {
        console.log('Save');
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick
        >
            <div className="mx-auto rounded-md">
                <IconButton
                    className='relative w-4 h-4 mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
                    src={close_icon}
                    onClick={onClose}
                    disabled={isLoading}
                />

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
                    <Button
                        onClick={handleSave}
                        className="bg-blue w-full disabled:bg-disabledBlue max-w-[250px]"
                        title="Save" />
                    <Button
                        onClick={onClose}
                        className="bg-[#F5B11A] w-full max-w-[250px]"
                        title="Close"
                    />

                </div>
            </div>
        </Modal>
    );
}

export default ConsentUnitsSelectionPopup;
