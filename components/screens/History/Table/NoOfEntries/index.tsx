import React from 'react';
import { PAGEOPTION } from '@/constants/history';

interface IProps {
  pageSize: string | number | readonly string[] | undefined;
  setPageSize: (newSize: number) => void;
}

function SelectEntries({ pageSize, setPageSize }: IProps) {
  return (
    <div className="flex items-center mb-4 font-sans dark:text-main">
      <span className="mr-2">Show</span>
      <select
        value={pageSize}
        onChange={(e) => {
          const newSize = Number(e.target.value);
          setPageSize(newSize);
        }}
        className="py-2 px-3 rounded-md text-lg focus:outline-none dark:bg-dark dark:text-main"
      >
        {PAGEOPTION.map((size) => (
          <option
            key={size}
            value={size}
            className=" focus:outline-none px-4 dark:bg-dark dark:text-main border-slate-500 justify-center items-center  border hover:bg-slate-500"
          >
            {size}
          </option>
        ))}
      </select>
      <span className="ml-2">entries</span>
    </div>
  );
}

export default SelectEntries;
