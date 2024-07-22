'use client';

import React from 'react';
import styles from './styles.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: JSX.Element;
  error: string | boolean | undefined;
}

function Checkbox({ id, name, label, checked, className, onChange, error }: IProps) {
  return (
    <>
      <label className={['flex items-center gap-x-3 relative', className].join(' ')} htmlFor={id}>
        <input type="checkbox" id={id} checked={checked} name={name} className="hidden" onChange={onChange} />
        <span
          className={[
            'w-4 h-4 rounded-[3px] bg-light border-solid border border-checkbox relative',
            styles.checkmark,
          ].join(' ')}
        />
        {label}
      </label>
      {error && <p className="block w-full font-sans text-sm text-error -mt-4">{error}</p>}
    </>
  );
}

export default Checkbox;
