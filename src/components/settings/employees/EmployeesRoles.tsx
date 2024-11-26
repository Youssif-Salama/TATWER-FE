import { GetAllRolesApi } from "@/api/roles/GetAllRolesApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import UpdateEmployeeRoles from "@/components/employees/allEmployees/UpdateEmployeeRoles";
import SystemsPagination from "@/components/systems/SystemsPagination";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EmployeesRoles = () => {
  const [roles,setRoles]=useState<any>([]);
  const [page,setPage]=useState<any>(1);
  const [loading,setLoading]=useState<boolean>(false);
  const [totalRows,setTotalRows]=useState<number>(0);
  const [rowsPerPage,setRowsPerPage]=useState<any>(10);

  const refreshAllRoles=useSelector((state:RootState)=>state.GlobalReducer?.refreshAllRoles)

  const getAllRoles=async()=>{
    const result=await GetAllRolesApi(page,setLoading,Number(rowsPerPage));
    result&&setRoles(result?.data?.data);
    result&&setTotalRows(result?.data?.meta?.numberOfRows);
  }

  useEffect(()=>{
    getAllRoles()
  },[page,rowsPerPage,refreshAllRoles])


  return (
    <div>
      <>
      {
        loading ? <div className="flex items-center justify-center h-[10vh]"><LoadingSpinner/></div>:<>
        {
          (roles && roles?.length>0) ?<>
           {/* display roles */}
          <div>
            {roles?.map((role:any)=>{
              return <UpdateEmployeeRoles key={role._id} role={role}/>
            })
            }
          </div>
          </>:
          <div className="flex items-center justify-center h-[10vh]"><p>لا يوجد بيانات</p></div>
        }
        </>
      }
      </>
      {
        (roles && roles?.length>0) &&
        <SystemsPagination page={page} setPage={setPage} totalRows={totalRows} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      }
    </div>
  );
}

export default EmployeesRoles
