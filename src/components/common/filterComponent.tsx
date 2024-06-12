import { Datepicker } from "flowbite-react";
import { Button, Line, Search } from ".";

interface FilterComponentProps {
  handleSearch: (
    e: React.MouseEvent,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  beforeDate: string;
  afterDate: string;
  handleChangeDateBefore: (date: Date) => void;
  handleChangeDateAfter: (date: Date) => void;
  handleDeleteFilter: () => void;
  optionalPlaceHolder?: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleSearch,
  beforeDate,
  afterDate,
  handleChangeDateBefore,
  handleChangeDateAfter,
  handleDeleteFilter,
  optionalPlaceHolder,
}) => {
  console.log(optionalPlaceHolder);
  return (
    <div className="block  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100">
      <div className="mb-2">
        <Search
          handleSearch={handleSearch}
          optionalPlaceHolder={optionalPlaceHolder}
        />
      </div>
      <Line variant="default" />
      <div className="mb-4 grid grid-cols-2 gap-5">
        <div>
          <h3>Date Before:</h3>
          <Datepicker
            value={beforeDate}
            onSelectedDateChanged={handleChangeDateBefore}
          />
        </div>
        <div>
          <h3>Date After:</h3>
          <Datepicker
            value={afterDate}
            onSelectedDateChanged={handleChangeDateAfter}
          />
        </div>
        <div></div>
        <div className="flex justify-end">
          <Button onClick={handleDeleteFilter} Text="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
