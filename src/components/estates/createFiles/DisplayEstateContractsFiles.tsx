import { GetAllContractsForSpecificEstateApi } from "@/api/estate/GetAllContractsForSpecificEstateApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import DisplayTenantFiles from "./contractFilesDisplayers/DisplayTenantFiles";
import DisplayLandlordFiles from "./contractFilesDisplayers/DisplayLandlordFiles";

const DisplayEstateContractsFiles = () => {
  const [open, setOpen] = useState<boolean>(false);
  // @ts-ignore
  const [tenantsLoading, setTenantsLoading] = useState<boolean>(false);
  const [tenantsPage, setTenantsPage] = useState<number>(1);
  const [tenantsTotalRows, setTenantsTotalRows] = useState<number>(0);
  const [currentEstate, setCurrentEstate] = useState<any>(null);
  const [allTenants, setAllTenants] = useState<any>([]);
  // @ts-ignore
  const [landlordsLoading, setLandlordsLoading] = useState<boolean>(false);
  const [landlordsPage, setLandlordsPage] = useState<number>(1);
  const [landlordsTotalRows, setLandlordsTotalRows] = useState<number>(0);
  const [allLandlords, setAllLandlords] = useState<any>([]);

  useEffect(() => {
    setCurrentEstate(Cookies.get("estateId"));
  }, []);
  const getAllEstateTenants = async () => {
    if (currentEstate) {
      const result = await GetAllContractsForSpecificEstateApi(
        setTenantsLoading,
        tenantsPage,
        currentEstate,
        "tenant"
      );
      result && setTenantsTotalRows(result?.data?.meta?.numberOfRows);
      result && setAllTenants(result?.data?.data);
    }
  };

  const getAllEstateLandLords = async () => {
    if (currentEstate) {
      const result = await GetAllContractsForSpecificEstateApi(
        setLandlordsLoading,
        tenantsPage,
        currentEstate,
        "landlord"
      );
      result && setLandlordsTotalRows(result?.data?.meta?.numberOfRows);
      result && setAllLandlords(result?.data?.data);
    }
  };

  return (
    <div className="w-full bg-[#f3f4f6] border text-[#0077bc] my-4 text-[12px] p-2">
      <p
        className="underline cursor-pointer"
        onClick={() => {
          setOpen(!open);
          getAllEstateTenants();
          getAllEstateLandLords();
        }}
      >
        اضغط لعرض المؤجرين والمستأجرين
      </p>
      <div
        className={`${open ? "block" : "hidden"}  w-full bg-[#0077bc]} grid grid-cols-2 gap-2 mt-4`}
      >
        <div className="border p-1 ">
          <DisplayTenantFiles allTenants={allTenants} setTenantsPage={setTenantsPage} totalRows={tenantsTotalRows} page={tenantsPage}/>
        </div>
        <div className="border p-1 ">
          <DisplayLandlordFiles   allLandlords={allLandlords} setLandlordsPage={setLandlordsPage} totalRows={landlordsTotalRows} page={landlordsPage}/>
        </div>
      </div>
    </div>
  );
};

export default DisplayEstateContractsFiles;
