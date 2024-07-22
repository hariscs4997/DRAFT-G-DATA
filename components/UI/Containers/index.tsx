import React from 'react';
import Main from './Main';
import Side from './Side';

interface IProps {
  children: React.ReactNode;
  type: 'main' | 'side';
  className?: string;
  style?: React.CSSProperties;
}

function Container({ children, type, className = '', style }: IProps) {
  return (
    <>
      {type === 'main' && (
        <Main className={`${className} dark:bg-main`} style={style}>
          {children}
        </Main>
      )}
      {type === 'side' && <Side className={`${className} dark:bg-main bg-[#f1e6d9]`}>{children}</Side>}
    </>
  );
}

export default Container;
