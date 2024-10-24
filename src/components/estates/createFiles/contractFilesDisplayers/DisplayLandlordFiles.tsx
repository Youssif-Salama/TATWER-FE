import { GetContractFileApi } from "@/api/file/GetContractFileApi";
import SystemsPagination from "@/components/systems/SystemsPagination"
import { useState } from "react";
import TenantFilesDisplay from "./TenantFilesDisplay";

const DisplayLandlordFiles = ({allLandlords,setLandlordsPage,page,totalRows}:any) => {
  const [clickedLandlord, setClickedLandlord] = useState<any>(null);

  const [landlordFiles, setLandlordFiles] = useState<any>(null);

  const getClickedLandlordFiles = async (id:any) => {
    if (clickedLandlord) {
      const result = await GetContractFileApi(id);
      result && setLandlordFiles(result?.data?.data[0].Files);
    }
  }

  return (
    <div className="text-[#1f1f1f]">
      <p>جميع المستأجرين المرتبطه بالعقار</p>
      {/* display tenants */}
      <div className="flex items-center gap-2 my-4">
        {
          allLandlords && allLandlords?.length>0 && allLandlords?.map((landlord:any)=>{
            return(
              <div key={landlord?._id} className={`bg-[#0077bc] px-2 py-1 text-white cursor-pointer hover:bg-[#0077bcb6]
              ${landlord?.ContractId==null && "hidden"}
              ${clickedLandlord?._id==landlord?._id && "underline"}
              `}
              onClick={()=>{
                setClickedLandlord(landlord)
                getClickedLandlordFiles(landlord?.ContractId?._id)
              }}
              >
                <p>{landlord?.ContractId?.Name}</p>
              </div>
            )
          })
        }
      </div>
      <div className="w-full flex items-end justify-end">
      {/* pagination */}
      {
        allLandlords && allLandlords?.length>0 && <SystemsPagination page={page} setPage={setLandlordsPage} totalRows={totalRows}/>
      }
      </div>
      {
        (allLandlords && allLandlords?.length>0 && allLandlords) &&
      <div className="my-4">
        <p>ملفات المستأجر { clickedLandlord?.ContractId?.Name}</p>
        <TenantFilesDisplay files={landlordFiles}/>
      </div>
      }
    </div>
  )
}

export default DisplayLandlordFiles
