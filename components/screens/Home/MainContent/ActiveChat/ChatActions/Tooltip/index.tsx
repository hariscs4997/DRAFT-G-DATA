import React from 'react';

type TProps = {
  show: boolean;
  message: string;
};
function Tooltip({ message, show }: TProps) {
  return (
    <div
      className={`absolute top-[-25px] left-0 bg-main dark:bg-bgMain px-2 py-1 rounded-md ${
        show ? 'opacity-1 visible' : 'opacity-0 invisible'
      }`}
    >
      <p className="dark:text-primary text-main text-base font-semibold font-raleway">{message}</p>
    </div>
  );
}

export default Tooltip;
