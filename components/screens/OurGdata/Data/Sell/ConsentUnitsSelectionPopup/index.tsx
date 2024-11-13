import React, { memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import { close_icon } from '@/public/assets';
import Button from '@/components/UI/Button';
import IconButton from '@/components/UI/IconButton';
import { AVAILABLECONSENTUNITSCOLUMN } from '@/constants/consent';
import Checkbox from '@/components/UI/Checkbox';
import moment from 'moment';

interface IProp {
    isOpen: boolean
    onClose: () => void;
    availableConsentUnits: any,
    handleSelectedAvailableUnits: (availableUnits: number[]) => void
}

function ConsentUnitsSelectionPopup({ isOpen, onClose, availableConsentUnits, handleSelectedAvailableUnits }: IProp) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedAvailableConsentUnits, setSelectedAvailableConsentUnits] = useState<{ [key: number]: boolean }>({})


    const { rows, getTableBodyProps, getTableProps, headerGroups, prepareRow } = useTable({
        data: availableConsentUnits,
        columns: AVAILABLECONSENTUNITSCOLUMN
    })
    const handleSave = () => {
        const selectedUnitsIDs: number[] = Object.keys(selectedAvailableConsentUnits).filter((key: string) => selectedAvailableConsentUnits[Number(key)]).map(Number);
        handleSelectedAvailableUnits(selectedUnitsIDs)
        onClose()
    }

    const toggleSelectedConsentUnit = (consentId: number) => {
        setSelectedAvailableConsentUnits((prev) => ({
            ...prev,
            [consentId]: !prev[consentId]
        }))
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            shouldCloseOnOverlayClick
        >
            <div className="mx-auto rounded-md">
                <IconButton
                    className='relative w-4 h-4 mobile:w-[15px] mobile:h-[15px] dark:invert-[1]'
                    src={close_icon}
                    onClick={onClose}
                    disabled={isLoading}
                />

                {availableConsentUnits &&
                    <table {...getTableProps()} className="w-full">
                        <thead>
                            {headerGroups.map((headerGroup: any, index) => (
                                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
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
                            {rows.map((row: any, index) => {
                                prepareRow(row);
                                return (
                                    <tr key={index} {...row.getRowProps()} className="even:bg-[#d4d4d4] dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                                        {row.cells.map((cell: any) => (
                                            <td
                                                key={cell.id}
                                                {...cell.getCellProps()}
                                                className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black dark:text-main font-sans font-normal text-base mobile:text-sm text-center ${selectedAvailableConsentUnits[row.original.id] && 'bg-[#bccfa6]'}`}
                                            >
                                                {cell.column.id === 'checkbox' ?
                                                    <Checkbox
                                                        checked={selectedAvailableConsentUnits[row.original.id]}
                                                        onChange={() => toggleSelectedConsentUnit(row.original.id)}
                                                        name={`consent-unit-${row.original.id}`}
                                                        id={`consent-unit-${row.original.id}`}
                                                        error=''
                                                        label=""
                                                    />
                                                    :
                                                    cell.column.id === 'created_at' ?
                                                        <p>{moment(row.original.created_at).format("YYYY-MM-DD hh:mm:ss")}</p>
                                                        :
                                                        cell.column.id === 'values' ?
                                                            <p>{row.original.value}</p>
                                                            :
                                                            cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }
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

export default memo(ConsentUnitsSelectionPopup);