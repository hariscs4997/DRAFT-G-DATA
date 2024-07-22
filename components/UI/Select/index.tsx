/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrow } from '@/public/assets';
import { capitalize } from '@/lib';
import { TDropdownOption } from '@/types';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Image from '../StyledImage';

type TProps = {
  options: TDropdownOption[];
  onClick: (x: string) => void;
  className?: string;
  style?: React.CSSProperties;
  value: string;
  increasePadding?: string;
};

function Select({ className, options, style, value, onClick, increasePadding }: TProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };
  useOutsideClick(selectRef, handleOutsideClick);

  return (
    <div
      ref={selectRef}
      style={style}
      className={[
        `relative bg-chat dark:bg-[#1C1C1C] dark:text-main ${increasePadding ?? 'py-[10px]'} px-4 ${
          isOpen ? 'rounded-md rounded-b-none' : 'rounded-md'
        } w-full`,
        className,
      ].join(' ')}
    >
      <div
        className="flex w-full justify-between items-center"
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        <label className="text-primary dark:text-main  font-sans font-normal text-base max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
          {capitalize(value)}
        </label>
        <Image
          src={arrow}
          alt="dropdown-icon"
          className={`w-6 h-6 transition-all ease-in duration-250 dark:invert ${isOpen ? 'rotate-180 ' : 'rotate-0'}`}
        />
      </div>

      {isOpen && (
        <ul className="list-none rounded-b-md absolute bg-chat dark:bg-[#1C1C1C] w-full top-[44px] left-0 z-10">
          {options
            .filter((item) => item.value !== value)
            .map((item) => (
              <li key={uuidv4()}>
                <div
                  tabIndex={0}
                  className={`cursor-pointer font-sans text-base font-normal text-primary dark:text-main  px-4 ${
                    increasePadding ?? 'py-[10px]'
                  }`}
                  role="button"
                  onClick={() => {
                    onClick(item.value);
                    toggleDropdown();
                  }}
                  onKeyDown={() => {
                    onClick(item.value);
                    toggleDropdown();
                  }}
                >
                  {capitalize(item.value)}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
