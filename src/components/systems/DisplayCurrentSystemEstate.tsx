import { GetEstateOnASpecificSystem } from "@/api/systems/GetEstateOnASpecificSystem"
import { useEffect, useState } from "react";
import SystemsPagination from "./SystemsPagination";

const DisplayCurrentSystemEstate = ({system,showMoreDetails}:any) => {
  const [currentEstate,setCurrentEstate]=useState<any>(null);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [meta,setMeta]=useState<any>(null);
  const getCurrentSystemEstate = async(id:any) => {
    const result=await GetEstateOnASpecificSystem(id,page,limit);
    result && setCurrentEstate(result?.data?.data);
    result && setMeta(result?.data?.meta);
  }

  useEffect(()=>{
    showMoreDetails && getCurrentSystemEstate(system?.ContractId);
  },[system,showMoreDetails,page,limit])
  return (
    <div className="text-[14px] p-2 py-4 grid grid-cols-2 gap-4">
      {
      currentEstate?.map((estate:any,index:number)=>{
        return(
          <div key={estate._id} className="flex items-center gap-2 justify-between border-[#0077bc] border shadow-md p-1 px-2 relative">
            <p className="absolute -top-2 bg-[#0077bc] text-white -right-1 text-[12px] rounded-full px-1">{index+1}</p>
            <p>العقار: {estate?.EstateName}</p>
            <p>مدينه: {estate?.AddressId?.Town}</p>
          </div>
        )
      })
      }
      <>
      {
        currentEstate?.length > 1 &&(
          <SystemsPagination
            page={page}
            setPage={setPage}
            totalRows={meta?.numberOfRows}
            rowsPerPage={limit}
            setRowsPerPage={setLimit}
          />
        )
      }
      </>
    </div>
  )
}

export default DisplayCurrentSystemEstate
