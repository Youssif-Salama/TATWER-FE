import { GetContractFileApi } from "@/api/file/GetContractFileApi";
import SystemsPagination from "@/components/systems/SystemsPagination"
import { useState } from "react";
import TenantFilesDisplay from "./TenantFilesDisplay";

const DisplayTenantFiles = ({allTenants,setTenantsPage,page,totalRows}:any) => {
    const [clickedTenant, setClickedTenant] = useState<any>(null);
    const [tenantFiles, setTenantFiles] = useState<any>(null);

    const getClickedTenantFiles = async (id:any) => {
      if (clickedTenant) {
        const result = await GetContractFileApi(id);
        result && setTenantFiles(result?.data?.data[0].Files);
      }
    }
  return (
    <div className="text-[#1f1f1f]">
      <p>جميع المؤجرين المرتبطه بالعقار</p>
      {/* display tenants */}
      <div className="flex items-center gap-2 my-4">
        {
          allTenants && allTenants?.length>0 && allTenants?.map((tenant:any)=>{
            return(
              <div key={tenant?._id} className={`bg-[#0077bc] px-2 py-1 text-white cursor-pointer hover:bg-[#0077bcb6]
              ${tenant?.ContractId==null && "hidden"}
              ${clickedTenant?._id==tenant?._id && "underline"}
              `}
              onClick={()=>{
                setClickedTenant(tenant);
                getClickedTenantFiles(tenant?.ContractId?._id);
              }}
              >
                <p>{tenant?.ContractId?.Name}</p>
              </div>
            )
          })
        }
      </div>
      <div className="w-full flex items-end justify-end">
        {/* pagination */}
      {
        allTenants && allTenants?.length>0 && <SystemsPagination page={page} setPage={setTenantsPage} totalRows={totalRows}/>
      }
      </div>
      {
        (allTenants && allTenants?.length>0 && tenantFiles) &&
      <div className="my-4">
        <p>ملفات المؤجر {clickedTenant?.ContractId?.Name}</p>
        <TenantFilesDisplay files={tenantFiles}/>
      </div>
      }
    </div>
  )
}

export default DisplayTenantFiles
