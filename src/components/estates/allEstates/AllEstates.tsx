import {  useEffect, useState } from "react";
import DiplayAllEstates from "./DiplayAllEstates";
import FilterEstates from "./FilterEstates";
import Cookies from "js-cookie";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";
import NotAllowedLayer from "@/common/NotAllowedLayer";

const AllEstates = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);

  const token=Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);

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
      {
        checkAuth(decodedToken,"get",["estates","estate"]) ? <>

      <div className="shadow-md">
        <DiplayAllEstates
          searchKeyWord={searchKeyWord}
          searchValue={searchValue}
          showWay={showWay}

        />
      </div>
        </> : <NotAllowedLayer/>
      }

    </div>
  );
};

export default AllEstates;
