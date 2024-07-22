import React from 'react';

interface IProps {
  filter: any;
  setFilter: any;
}
function GlobalFilter({ filter, setFilter }: IProps) {
  return (
    <div className="relative rounded-md border border-main dark:border-white shadow-2xl dark:bg-darkinput dark:border-darkinput transition-all ease-in duration-150">
      <div className="flex justify-between items-center gap-x-2 h-full px-2 md:py-0 bg-transparent">
        <input
          className="bg-transparent font-sans font-base font-bold text-black dark:text-white outline-none border-none  dark:bg-darkinput dark:border-darkinput dark:placeholder-[#D8D8D8] my-3 w-full"
          type="text"
          placeholder="Search Here"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GlobalFilter;
