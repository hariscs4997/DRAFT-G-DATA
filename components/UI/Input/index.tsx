import React, { useState } from 'react';
import Image from 'next/image';

import { showpassword, hidepassword } from '@/public/assets';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean | undefined;
  isMonetaryInput?: boolean;
  currency?: string;
}
function Input({
  label,
  placeholder,
  onChange,
  error,
  type,
  style,
  className,
  value,
  name,
  readOnly,
  isMonetaryInput,
  currency,
  min,
  onClick 
}: IProps) {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={['flex flex-col gap-y-3 relative', className].join(' ')} style={style}>
      <label className="text-base font-bold font-sans text-black dark:text-white" htmlFor={name}>
        {label}
      </label>
      {isMonetaryInput && (
        <span className="text-black font-sans font-normal text-xl absolute top-[54%] left-[15px]">{currency}</span>
      )}
      {type === 'password' ? (
        <div className="relative w-full ">
          <input
            autoComplete="off"
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            readOnly={readOnly}
            id={name}
            min={min}
            type={showPassword ? 'text' : 'password'}
            value={value}
            className="bg-chat dark:bg-darkChat py-5 px-7 rounded-md text-black dark:text-main font-sans font-normal text-xl placeholder:font-normal placeholder:font-sans placeholder:text-xl placeholder:text-placeholder  focus:outline-none w-full"
            onClick={onClick}
          />
          <Image
            src={showPassword ? showpassword : hidepassword}
            alt={showPassword ? 'hide-password-icon' : 'show-password-icon'}
            className="h-5 w-5 dark:invert-[1] cursor-pointer absolute top-[50%] right-[10px] transform translate-y-[-50%]"
            onClick={togglePasswordVisibility}
          />
        </div>
      ) : (
        <input
          autoComplete="off"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          readOnly={readOnly}
          id={name}
          type={type || 'text'}
          value={value}
          onClick={onClick}
          className="bg-chat dark:bg-darkChat py-5 px-7 rounded-md dark:text-main text-black font-sans font-normal text-xl placeholder:font-normal placeholder:font-sans placeholder:text-xl placeholder:text-placeholder focus:outline-none"
        />
      )}

      {error && <p className="font-sans text-sm text-error -mt-2">{error}</p>}
    </div>
  );
}

export default Input;
