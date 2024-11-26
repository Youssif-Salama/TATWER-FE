import { GetAllRolesApi } from "@/api/roles/GetAllRolesApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import SystemsPagination from "@/components/systems/SystemsPagination";
import React, { useEffect, useState } from "react";
import EmployeeRoles from "./EmployeeRoles";

interface Permission {
  post: boolean;
  delete: boolean;
  get: boolean;
  put: boolean;
}

interface Page {
  all: boolean;
  [key: string]: Permission | boolean;
}

interface PagesData {
  [key: string]: Page;
}

interface NestedEmployeePagesProps {
  data: {
    Pages: PagesData;
  };
}

const NestedEmployeePages: React.FC<NestedEmployeePagesProps> = ({ data }:any) => {
  const [roles,setRoles]=useState<any>([]);
  const [page,setPage]=useState<any>(1);
  const [loading,setLoading]=useState<boolean>(false);
  const [totalRows,setTotalRows]=useState<number>(0);
  const [rowsPerPage,setRowsPerPage]=useState<any>(10);


  const getAllRoles=async()=>{
    const result=await GetAllRolesApi(page,setLoading,rowsPerPage);
    result&&setRoles(result?.data?.data);
    result&&setTotalRows(result?.data?.meta?.numberOfRows);
  }

  useEffect(()=>{
    getAllRoles()
  },[page,rowsPerPage])


  return (
    <div className={` p-4 text-[12px] ${data?.Role=="super_admin" && "hidden"}`}>
      <p className="text-[#0077bc] underline p-2 w-full">* اختار من الصلاحيات المتاحه</p>
      <>
      {
        loading ? <div className="flex items-center justify-center h-[10vh]"><LoadingSpinner/></div>:<>
        {
          (roles && roles?.length>0) ?<>
           {/* display roles */}
          <div>
            {roles?.map((role:any)=>{
              return <EmployeeRoles key={role._id} role={role} employee={data}/>
            })
            }
          </div>
          </>:<div className="flex items-center justify-center h-[10vh]">لا يوجد ادوار متاحه للاستخدام</div>
        }
        </>
      }
      </>
      {
          roles && roles?.length>0 && <SystemsPagination page={page} setPage={setPage} totalRows={totalRows} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      }
    </div>
  );
};

export default NestedEmployeePages;
