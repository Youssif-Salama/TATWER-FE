import ReportsHead from "@/components/reports/nav/ReportsHead"
import { useEffect, useState } from "react"
import EstateFilters from "./EstateFilters";
import { GetAllContractsForSpecificEstateApi } from "@/api/estate/GetAllContractsForSpecificEstateApi";
import EstateMeta from "../estateMeta/EstateMeta";
import ContractsEstateMain from "../contracts/ContractsEstateMain";

const OneEstateMain = () => {
  const [currentEstate,setCurrentEstate] = useState<any>(null);
  const [contractStartDate,setContractStartDate] = useState<any>(null);
  const [contractEndDate,setContractEndDate] = useState<any>(null);
  const [allTenats,setAllTenants] = useState<any>([]);
  const [tenantsPage,setTenantsPage] = useState<number>(1);
  const [tenantsTotalRows,setTenantsTotalRows] = useState<number>(0);
  // @ts-ignore
  const [tenantsLoading,setTenantsLoading] = useState<boolean>(false);

  const [allLandlords,setAllLandlords] = useState<any>([]);
  const [landlordsPage,setLandlordsPage] = useState<number>(1);
  const [landlordsTotalRows,setLandlordsTotalRows] = useState<number>(0);
   // @ts-ignore
  const [landlordsLoading,setLandlordsLoading] = useState<boolean>(false);

  const getAllContractsForSpecificEstateTenants=async()=>{
    const result =await GetAllContractsForSpecificEstateApi(setTenantsLoading,tenantsPage,currentEstate?._id,"tenant");
    result&&setAllTenants(result?.data?.data);
    result&&setTenantsTotalRows(result?.data?.meta?.numberOfRows);
  }

  const getAllContractsForSpecificEstateLandlords=async()=>{
    const result =await GetAllContractsForSpecificEstateApi(setLandlordsLoading,landlordsPage,currentEstate?._id,"landlord");
    result&&setAllLandlords(result?.data?.data);
    result&&setLandlordsTotalRows(result?.data?.meta?.numberOfRows);
  }


  useEffect(()=>{
    setAllTenants([]);
    getAllContractsForSpecificEstateTenants()
  },[currentEstate,tenantsPage])

  useEffect(()=>{
    setAllLandlords([]);
    getAllContractsForSpecificEstateLandlords()
  },[currentEstate,landlordsPage])



  return (
    <div className="py-8 text-[12px]">
      <div>
        {/* header */}
        <ReportsHead message="تقرير موقع محدد"/>
      </div>
      <div>
        {/* filters */}
        <EstateFilters setCurrentEstate={setCurrentEstate} setContractStartDate={setContractStartDate} setContractEndDate={setContractEndDate} startDate={contractStartDate} endDate={contractEndDate}/>
      </div>
      <div>
        {/* estate meta */}
        {currentEstate && <EstateMeta estate={currentEstate} startDate={contractStartDate} endDate={contractEndDate}/>}
      </div>
      <div>
        {/* contracts */}
        {(allLandlords || allTenats) && <ContractsEstateMain currentEstate={currentEstate} allTenants={allTenats} allLandlords={allLandlords} setTenantsPage={setTenantsPage} setLandlordsPage={setLandlordsPage} tenantsPage={tenantsPage} landlordsPage={landlordsPage} tenantsTotalRows={tenantsTotalRows} landlordsTotalRows={landlordsTotalRows} />}
      </div>
    </div>
  )
}

export default OneEstateMain
