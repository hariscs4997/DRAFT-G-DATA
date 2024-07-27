import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// import { MOSTFREQUENCYCOLUMN } from "../../constants/index";
import close_icon from '@/public/icons/close_icon.png';
import { INTERESTEDCOMPANYDATACOLUMNS } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';

import Image from 'next/image';
import Table from '../../Table';

interface IProp {
  data: any;
  openModal: boolean | undefined;
  isClose: () => void;
  value: string
  id: any
}
function ModalTable({ data, openModal, isClose, value, id }: IProp) {
  const [showTable, setShowTable] = useState(openModal);

  const { theme } = useTheme();
  const bg = {
    content: {
      background: theme === 'dark' ? '#454545' : 'white',
      overflow: 'auto',
    },
  };

  return (
    <div className="p-5">

      <Modal
        isOpen={openModal || false}
        onRequestClose={isClose} // Removed unnecessary arrow function
        shouldCloseOnOverlayClick
        style={bg}

      >
        <div className="mx-auto rounded-md">
          <div
            onClick={() => {
              setShowTable(false);
              isClose();
            }}
            className="-mt-6 float-right w-4 h-4 cursor-pointer"
          >
            <Image src={close_icon} alt="close" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
          </div>
          <h1 className="text-3xl font-bold my-4 text-[#001F12] dark:text-white justify-center items-center flex uppercase">
            {value}
          </h1>
          <Table data={data.data} columns={INTERESTEDCOMPANYDATACOLUMNS} personalId={id} isClose={isClose} />
        </div>
      </Modal>
    </div>
  );
}

export default ModalTable;
