import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
function Main({ children, className = ' ', style }: IProps) {
  return (
    <div
      className={[
        'bg-[#fbf8f1] drop-shadow-container h-[calc(100vh_-_2.5rem)] w-full flex-1 rounded-l-lg relative overflow-hidden',
        className,
      ].join(' ')}
      style={style}
    >
      {children}
    </div>
  );
}

export default Main;
