import {  useState } from "react";
import DiplayAllEstates from "./DiplayAllEstates";
import FilterEstates from "./FilterEstates";

const AllEstates = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);



  return (
    <div className="flex gap-4 w-full flex-col">

      <div>
        <FilterEstates
          setSearchKeyWord={setSearchKeyWord}
          setSearchValue={setSearchValue}
          searchKeyWord={searchKeyWord}
          setShowWay={setShowWay}
        />
      </div>
      <div className="shadow-md">
        <DiplayAllEstates
          searchKeyWord={searchKeyWord}
          searchValue={searchValue}
          showWay={showWay}
          
        />
      </div>
    </div>
  );
};

export default AllEstates;
