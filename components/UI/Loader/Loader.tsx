import React from 'react';
import './styles.css';

function Loader() {
  return (
    <div className="relative w-10 h-10 loader">
      <span className="absolute w-[5px] h-[5px] bg-[#3b5998] rounded-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <span className="absolute w-[5px] h-[5px] bg-[#3b5998] rounded-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <span className="absolute w-[5px] h-[5px] bg-[#3b5998] rounded-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
export default Loader;