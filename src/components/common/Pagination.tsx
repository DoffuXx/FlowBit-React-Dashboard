import React, { MouseEventHandler, useEffect } from "react";

interface PaginationProps {
  nextPage: MouseEventHandler<HTMLButtonElement>;
  prevPage: MouseEventHandler<HTMLButtonElement>;
  totalItems: number;
  currentPage: number;
  listofItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  prevPage,
  totalItems,
  currentPage,
  listofItems,
}) => {
  const ITEMS_PER_PAGE = 10;
  const [records, setRecords] = React.useState({
    first: 1,
    last: ITEMS_PER_PAGE,
  });
  const calculateRecords = () => {
    setRecords({
      first: (currentPage - 1) * ITEMS_PER_PAGE + 1,
      last: listofItems + (currentPage - 1) * ITEMS_PER_PAGE,
    });
    console.log(listofItems);
  };

  useEffect(() => {
    calculateRecords();
  }, [currentPage]);
  return (
    <div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Montrant{" "}
          <span className="font-semibold text-gray-900 ">{records.first}</span>{" "}
          à <span className="font-semibold text-gray-900 ">{records.last}</span>{" "}
          de <span className="font-semibold text-gray-900 ">{totalItems}</span>{" "}
          Entrées
        </span>
        <div className="xs:mt-0 mt-2 inline-flex space-x-5">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex h-10 items-center justify-center rounded-s px-4 text-base font-medium 
            ${currentPage === 1 ? "cursor-not-allowed bg-gray-300 text-gray-900" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            Précédente
          </button>
          <button
            onClick={nextPage}
            disabled={records.last === totalItems}
            className={`flex h-10 items-center justify-center rounded-s px-4 text-base font-medium 
            ${records.last === totalItems ? "cursor-not-allowed bg-gray-300 text-gray-900" : "bg-gray-800 text-white hover:bg-gray-900"}`}
          >
            Suivante
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
