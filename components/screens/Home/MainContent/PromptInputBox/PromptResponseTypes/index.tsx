/* eslint-disable no-nested-ternary */

'use client';

import React from 'react';
import { PROMPTRESPONSEOPTIONS } from '@/constants';
import { TPROPTION, Theme } from '@/types';
import { ResponseChoice } from '@/state/chats/types';
import { useTheme } from '@/context/ThemeProvider';

interface IProps {
  selectedResponseType: ResponseChoice;
  setSelectedResponseType: (responseType: TPROPTION) => void;
}

function PromptResponseTypes({ selectedResponseType, setSelectedResponseType }: IProps) {
  const { theme } = useTheme();
  return (
    <div className="flex gap-x-3 ml-2 w-full mobile:flex-col ">
      {PROMPTRESPONSEOPTIONS.map((option) => (
        <button
          key={option.title}
          type="button"
          className="rounded-b-xl w-[30%] max-w-[250px] py-3 cursor-pointer  mobile:w-[211px] mobile:text-[14px] mobile:px-[2px] mobile:my-[2px] mobile:py-2 transition-all duration-300 ease"
          style={{
            backgroundColor:
              selectedResponseType === option.value
                ? theme === Theme.LIGHT
                  ? option.color
                  : option.darkColor
                : 'transparent',
            border: `2px solid ${theme === Theme.LIGHT ? option.color : option.darkColor}`,
            borderTopWidth: '0px !important',
          }}
          onClick={() => setSelectedResponseType(option)}
        >
          <p
            className={`${
              selectedResponseType === option.value ? 'text-white' : 'text-primary dark:text-white'
            }  font-sans font-medium text-lg laptop:text-base text-center mobile:text-xs`}
          >
            {' '}
            {option.title}
          </p>
        </button>
      ))}
    </div>
  );
}
export default PromptResponseTypes;
