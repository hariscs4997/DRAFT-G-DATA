import { TOptions } from '@/types';
import React from 'react'
import Select, { MultiValue, StylesConfig } from 'react-select';
import { twMerge } from 'tailwind-merge';


const customStyles: StylesConfig<TOptions, true> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#d9d9d9',
    borderColor: 'transparent',
    borderWidth: '1px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    boxShadow: "none",
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    ':hover': {
      borderColor: 'transparent',
      borderWidth: '1px',
      boxShadow: "none"
    },


  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',  // Background color of dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#5a9' : state.isFocused ? '#ddd' : '#fff',  // Hover and select colors
    color: state.isSelected ? '#fff' : '#333',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '2px 5px',
    flex: '1 0 auto',

  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#000',
    ':hover': {
      backgroundColor: '#ffcccc',
      color: '#ff0000',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'auto',
    flexWrap: 'unset',

  }),
};


type TProps = {
  name: string;
  options: TOptions[];
  onChange: (newValue: MultiValue<TOptions>) => void;
  className?: string;
  values: MultiValue<TOptions>
  isDisabled?: boolean
}
function MultiSelect({ name, options, onChange, className = '', values, isDisabled = false }: TProps) {
  return (
    <Select
      name={name}
      closeMenuOnSelect={false}
      isMulti
      options={options}
      onChange={onChange}
      styles={customStyles}
      className={twMerge('min-w-[200px]', className)}
      value={values}
      isDisabled={isDisabled}
    />
  )
}

export default MultiSelect