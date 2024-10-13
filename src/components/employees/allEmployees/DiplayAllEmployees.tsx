import { customStyles } from "@/common/TableRowStyle";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import NestedTableFeatures from "./NestedTableFeatures";
import { GetAllEmployeesApi } from "@/api/employee/GetAllEmployeesApi";
import axios from "axios";
import Cookies from "js-cookie";
import NestedEmployeePages from "./NestedEmployeePages";
import { decodeToken } from "@/methods/GlobalMethods";


export interface AllEmployeesTypes {
  Fname: string
  Lname: string
  Email: string
  Role: string
  Password: string
  Blocked: boolean
  Verified: boolean
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}


const DiplayAllEmployees = ({searchKeyWord,searchValue,showWay}:{searchKeyWord:string |null,searchValue:string|null,showWay:string|null}) => {
  const { refreshONDeleteEmployee,refreshOnUpdateEmployee} = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [catchSelectedRows, setCatchSelectedRows] = useState<any[]>([]);

  const getAllEmployees = async () => {
    const result = await GetAllEmployeesApi(setLoading, page,limit,showWay,searchKeyWord,searchValue);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllEmployees(result?.data?.data);
  };

  useEffect(() => {
    getAllEmployees();
  }, [ page,searchKeyWord,searchValue,showWay,refreshONDeleteEmployee,refreshOnUpdateEmployee,limit]);

  const token=Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, [token]);


  const columns = [
    {
      name: "رقم",
      // @ts-ignore
      selector: (row: AllEmployeesTypes, index: number) => index + 1,
    },
    {
      name: "اسم الموظف",
      selector: (row: AllEmployeesTypes) => <div>
        {row?.Fname + " " + row?.Lname} {
          row?._id===decodedToken?._id && <span className="text-[#0077bc]">(انت)</span>
        }
      </div>,
    },
    {
      name: "البريد الالكتروني",
      selector: (row: AllEmployeesTypes) => <div className={`${row?.Verified?"":"text-red-500"}`}>
{row?.Email}
      </div>,
    },
    {
      name: "تاريخ التسجيل",
      selector: (row: AllEmployeesTypes) => row?.createdAt.slice(0,10),
      maxWidth: "100px",
    },
    {
      name:"الحالة",
      selector: (row: AllEmployeesTypes) => <div
      className={`${row?.Role==="employee"?"bg-[#0077bc] text-white":"bg-white text-[#0077bc]"} p-1 rounded-md cursor-pointer border border-[#0077bc]`}
      onClick={
        async()=>{
            if(row?._id===decodedToken?._id){
              return
            }
          else{
            const result=await axios.put(`${import.meta.env.VITE_BASE_URL}employee/role/${row._id}`,{
              Blocked:!row?.Blocked
            },{
              headers:{
                token:Cookies.get("token")
              }
            })
            result && getAllEmployees()
          }
          }
        }
      >
      {
        (row?.Role === "employee" && row?._id !== decodedToken?._id)
          ? "موظف"
          : "ادمن"
      }
    </div>,
    maxWidth: "75px",
    },
    {
      name:"حظر",
      selector: (row: AllEmployeesTypes) => <label className="inline-flex items-center cursor-pointer">
      <input
      onClick={async()=>{
        if(row?._id===decodedToken?._id){
          return
        }
        else{

          const result=await axios.put(`${import.meta.env.VITE_BASE_URL}employee/block/${row._id}`,{
          Blocked:!row?.Blocked
        },{
          headers:{
            token:Cookies.get("token")
          }
        })
        result && getAllEmployees()
          }
      }}

      type="checkbox"  checked={row?.Blocked} className="sr-only peer"/>
      <div className="relative w-11 h-6 bg-gray-200   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0077bc]"></div>
    </label>,
    maxWidth: "75px",
    }
  ];


  const handleSelectedRowsChange=({selectedRows}:any)=>{
    setCatchSelectedRows(selectedRows)
  }

  return (
    <div className="py-4 text-[12px]">
{
  catchSelectedRows.length > 0 && catchSelectedRows.every((item) => item?.Role !== "super_admin") && (
    <NestedTableFeatures selectedRows={catchSelectedRows} setCatchSelectedRows={setCatchSelectedRows} />
  )
}


      <DataTable
        // @ts-ignore
        columns={columns}
        data={allEmployees}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onSelectedRowsChange={handleSelectedRowsChange}
        selectableRows
        // @ts-ignore
        onChangePage={(value: number) => {
          setPage(value);
        }}
        // @ts-ignore
        customStyles={customStyles}
        noDataComponent="لا يوجد بيانات"
        expandableRows
        expandOnRowClicked
        // @ts-ignore
        expandableRowsComponent={NestedEmployeePages}
        onChangeRowsPerPage={(value: number) => {
          setLimit(value);
        }}
      />
    </div>
  );
};

export default DiplayAllEmployees;
