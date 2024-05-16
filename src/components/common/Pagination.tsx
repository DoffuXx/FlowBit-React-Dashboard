import React from "react";
interface paginationProps {
  postsPerPage: number;
  length: number;
}

// eslint-disable-next-line react/prop-types
const Pagination = ({ postsPerPage, length }: paginationProps) => {
  const paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          {paginationNumbers.map((number) => (
            <li key={number}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
