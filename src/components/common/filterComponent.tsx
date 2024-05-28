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
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleSearch,
  beforeDate,
  afterDate,
  handleChangeDateBefore,
  handleChangeDateAfter,
  handleDeleteFilter,
}) => {
  return (
    <div className="block  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100">
      <div className="mb-2">
        <Search handleSearch={handleSearch} />
      </div>
      <Line variant="default" />
      <div className="mb-4 grid grid-cols-2 gap-5">
        <div>
          <h3>Date Avant :</h3>
          <Datepicker
            value={beforeDate}
            onSelectedDateChanged={handleChangeDateBefore}
          />
        </div>
        <div>
          <h3>Date Après :</h3>
          <Datepicker
            value={afterDate}
            onSelectedDateChanged={handleChangeDateAfter}
          />
        </div>
        <div></div>
        <div className="flex justify-end">
          <Button onClick={handleDeleteFilter} Text="Annuler" />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
