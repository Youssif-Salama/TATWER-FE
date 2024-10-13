import {  useEffect, useState } from "react";
import AllContractsSwitcher from "./AllContractsSwitcher";
import DiplayAllContracts from "./DiplayAllContracts";
import FilterContracts from "./FilterContracts";
import Cookies from "js-cookie";
import { decodeToken } from "@/methods/GlobalMethods";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import NotAllowedLayer from "@/common/NotAllowedLayer";

const AllContracts = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
   // @ts-ignore
  const {contractType} = useSelector((state: RootState) => state.GlobalReducer);

  const token=Cookies.get("token");

  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);


  function hasAccess() {
    if (
      decodedToken?.Role === "super_admin" ||
      decodedToken?.Pages["contracts"].all === true ||
      (decodedToken?.Pages["contracts"].all === false &&
        (decodedToken?.Pages["contracts"]["landlords"].get === true ||
         decodedToken?.Pages["contracts"]["tenants"].get === true))
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="flex gap-4 w-full flex-col">
      <div className="shadow-md">
        <AllContractsSwitcher />
      </div>
      {
        hasAccess()?<NotAllowedLayer/>:<>
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
      </>
    }
    </div>
  );
};

export default AllContracts;
