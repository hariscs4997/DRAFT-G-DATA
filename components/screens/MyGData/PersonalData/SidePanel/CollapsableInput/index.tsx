'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { arrow, plus } from '@/public/assets';
import { TDropdownOption } from '@/types';
import Select from '@/components/UI/Select';
import FileInput from './fileInput';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string | boolean | undefined;
  isAddingFieldEnabled?: boolean;
  fields?: { [key: string]: string };
  addNewField?: () => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  noOfFiles?: number;
  isSelectInput?: boolean;
  selectOptions?: TDropdownOption[];
  onSelectOption?: (item: string) => void;
  disabled?: boolean
  setOnWheel?: boolean
}

function CollapsableInput({
  name,
  value,
  onChange,
  title,
  type,
  placeholder,
  readOnly,
  error,
  isAddingFieldEnabled = false,
  fields,
  addNewField,
  handleFileChange,
  noOfFiles,
  isSelectInput = false,
  selectOptions,
  onSelectOption,
  disabled = false,
  setOnWheel = false

}: IProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row items-start gap-x-2 pt-3 pl-2 pr-3 w-full tablet:gap-x-0 mobile:gap-x-1 ${isCollapsed ? 'pb-3' : 'pb-5'
          } rounded-xl bg-light dark:bg-main transition duration-300`}
      >
        <Image
          unoptimized
          src={arrow}
          alt="arrow-icon"
          height={24}
          width={24}
          className={`transition duration-300 ${isCollapsed && 'rotate-180 '} dark:invert`}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        />
        <header className="flex flex-col gap-y-[18px] w-full relative">
          <label htmlFor={name} className="text-primary font-sans font-medium text-xl  dark:text-main">
            {title}
          </label>
          {!isCollapsed && !isAddingFieldEnabled && type !== 'file' && !isSelectInput && (
            <input
              autoComplete="off"
              placeholder={placeholder}
              onChange={onChange}
              name={name}
              readOnly={readOnly}
              id={name}
              type={type || 'text'}
              value={value}
              className="bg-chat dark:bg-darkChat py-[10px] px-4 rounded-md text-primary dark:text-main w-full font-sans font-normal text-base placeholder:font-normal placeholder:font-sans placeholder:text-xl placeholder:text-placeholder focus:outline-none tablet:px-2 mobile:px-1"
              disabled={disabled}
              {...setOnWheel && { onWheel: (e: any) => e.target.blur() }}
            />
          )}
          {!isCollapsed && !isAddingFieldEnabled && type !== 'file' && isSelectInput && (
            <Select options={selectOptions!} className="w-auto " value={value?.toString()!} onClick={onSelectOption!} />
          )}
          {!isCollapsed && !isAddingFieldEnabled && type === 'file' && !isSelectInput && (
            <FileInput onChange={handleFileChange!} noOfFiles={noOfFiles ?? 0} />
          )}
          {!isCollapsed && isAddingFieldEnabled && !isSelectInput && fields && (
            <>
              {Object.entries(fields).map(([key, val]) => (
                <input
                  autoComplete="off"
                  key={`emotionList-${key}`}
                  placeholder={placeholder}
                  onChange={onChange}
                  name={key}
                  readOnly={readOnly}
                  id={`emotionList-${key}`}
                  type={type || 'text'}
                  value={val}
                  className="bg-chat dark:bg-darkChat py-[10px] px-4 rounded-md text-primary dark:text-white w-full font-sans font-normal text-base placeholder:font-normal placeholder:font-sans placeholder:text-xl placeholder:text-placeholder focus:outline-none"
                  disabled={disabled}
                  {...setOnWheel && { onWheel: (e: any) => e.target.blur() }}

                />
              ))}

              <button
                className="flex flex-row items-center gap-x-2 outline-none bg-none dark:text-main focus:outline-none font-sans font-medium text-primary text-sm"
                type="button"
                onClick={addNewField}
              >
                <Image src={plus} alt="plus-icon" height={20} width={22} className="dark:invert" /> Add new field
              </button>
            </>
          )}
        </header>
      </div>
      {error && <p className="font-sans text-sm text-error -mt-2">{error}</p>}
    </>
  );
}

export default CollapsableInput;
