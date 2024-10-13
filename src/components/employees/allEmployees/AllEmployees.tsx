import {  useState } from "react";
import FilterEmployees from "./FilterEmployees";
import DiplayAllEmployees from "./DiplayAllEmployees";

const AllEmployees = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);



  return (
    <div className="flex gap-4 w-full flex-col">

      <div>
        <FilterEmployees
          setSearchKeyWord={setSearchKeyWord}
          setSearchValue={setSearchValue}
          searchKeyWord={searchKeyWord}
          setShowWay={setShowWay}
        />
      </div>
      <div className="shadow-md">
        <DiplayAllEmployees
          searchKeyWord={searchKeyWord}
          searchValue={searchValue}
          showWay={showWay}

        />
      </div>
    </div>
  );
};

export default AllEmployees;
