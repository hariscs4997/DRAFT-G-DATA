import React from 'react';

interface IProps {
  pageIndex: number;
  previousPage: () => void;
  canPreviousPage: boolean;
  nextPage: () => void;
  canNextPage: boolean;
}

function Pagination({ pageIndex, previousPage, canPreviousPage, nextPage, canNextPage }: IProps) {
  return (
    /* eslint-disable */
    <div className="mt-5 mx-auto w-fit">
      <button
        onClick={previousPage}
        disabled={!canPreviousPage}
        className="bg-black text-white px-6 py-2 text-base disabled:bg-slate-600 mx-3 rounded-md disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="bg-blue text-white px-6 py-2 rounded-md text-lg dark:bg-darkBlue">{pageIndex + 1}</span>
      <button
        onClick={nextPage}
        disabled={!canNextPage}
        className="bg-black text-white px-6 py-2 text-base disabled:bg-slate-600 mx-3 rounded-md disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    /* eslint-enable */
  );
}

export default Pagination;
