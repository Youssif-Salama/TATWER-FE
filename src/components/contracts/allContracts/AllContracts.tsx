import {  useState } from "react";
import AllContractsSwitcher from "./AllContractsSwitcher";
import DiplayAllContracts from "./DiplayAllContracts";
import FilterContracts from "./FilterContracts";

const AllContracts = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);


  return (
    <div className="flex gap-4 w-full flex-col">
      <div className="shadow-md">
        <AllContractsSwitcher />
      </div>
      <div>
        <FilterContracts
          setSearchKeyWord={setSearchKeyWord}
          setSearchValue={setSearchValue}
          searchKeyWord={searchKeyWord}
          setShowWay={setShowWay}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="shadow-md">
        <DiplayAllContracts
          searchKeyWord={searchKeyWord}
          searchValue={searchValue}
          showWay={showWay}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default AllContracts;
