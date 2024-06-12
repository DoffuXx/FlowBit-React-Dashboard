import React from "react";

interface SearchProps {
  handleSearch: (
    e: React.MouseEvent,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  optionalPlaceHolder?: string;
}
const Search: React.FC<SearchProps> = ({
  handleSearch,
  optionalPlaceHolder,
}) => {
  const [search, setSearch] = React.useState("");
  const placeholder = optionalPlaceHolder
    ? optionalPlaceHolder
    : "Search by Title";

  return (
    <form className="">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          required
        />
        <button
          type="submit"
          className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          onClick={(e) => handleSearch(e, search, setSearch)}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
