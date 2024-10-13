import {  useEffect, useState } from "react"
import ReportsHead from "../../nav/ReportsHead"
import ContractFilters from "./ContractFilters"
import ContractTable from "./ContractTable";
import { GetAllContractsForReportsApi } from "@/api/reports/GetAllContractsForReportsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { generateArabicExcelFromArray, generatePdfFromArray } from "@/methods/Print";
import SystemsPagination from "@/components/systems/SystemsPagination";

const ContractMain = () => {
  const [startDate,setStartDate]=useState<any >();
  const [endDate,setEndDate]=useState<any>();
  const [fullView,setFullView]=useState<boolean>(false);
  const [allContracts,setAllContracts]=useState<any>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [page,setPage]=useState<any>(1);
  const [numberOfRows,setNumberOfRows]=useState<any>(0);
  const headers = [
    "الرمز",
    "الاسم",
    "الهويه",
    "الجوال",
    "جوال اخر",
    "الصفه",
    "الايميل",
    "العقار المرتبط",
    "المدينه الخاصه بالعقار",
    "الحساب البنكي",
    "المدينه",
    "الممثل",
    "جوال الممثل",
    "رقم الوكاله",
    "رقم العقد",
    "بدايه العقد",
    "نهايه العقد",
    "مسجل علي"
  ];

  const keys = [
    "Name",
    "IdNumber",
    "Mobile",
    "AdditionalPhone",
    "Type",
    "Email",
    "estate.EstateName",
    "estate.PieceNumber",
    "BankAccount",
    "AddressId.City",
    "Agent",
    "MobileNumber",
    "DocumentNumber",
    "ContractNumber",
    "ContractReleaseDate",
    "ContractEndDate",
    "RelyOn"
  ];



  const callGetAllContracts=async()=>{
    const result=await GetAllContractsForReportsApi(page,setLoading,startDate,endDate);
    result&&setAllContracts(result?.data?.data);
    result&&setNumberOfRows(result?.data?.meta?.numberOfRows);
  }

  useEffect(()=>{
    callGetAllContracts();
  },[startDate,endDate,page])

  return (
    <div className="py-8">
      <div>
        <ReportsHead message="تقارير عن المؤجرين والمستأجرين"/>
      </div>
      <div >
        {/* filters */}
        <ContractFilters startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} fullView={fullView} setFullView={setFullView} />
      </div>
      <div className="flex items-center justify-end gap-x-1 mb-1">
        {/* printing */}
        <div>
          <button
          onClick={()=>{
            generatePdfFromArray(allContracts,headers,keys,"A1","تطوير-تقرير-العقود")
          }}
          className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">pdf</button>
        </div>
        <div>
          <button
          onClick={()=>{
            generateArabicExcelFromArray(allContracts,headers,keys,"تطوير-تقرير-العقود")
          }}
          className="bg-green-500 text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">excel</button>
        </div>
      </div>
      <div>
        {/* table */}
        {
          loading ? <div className="w-full h-[300px] flex items-center justify-center"><LoadingSpinner/></div>:<>

        {
          allContracts && allContracts?.length===0 ? <div className="w-full bg-gray-100 border flex items-center justify-center p-4">  لا يوجد بيانات</div>
          :<ContractTable allContracts={allContracts} fullView={fullView} />
        }
          </>
        }
      </div>
      {
        allContracts && allContracts?.length!==0 &&<div className="flex items-center justify-end mt-6">
        {/* pagination */}
        <div className="flex items-end gap-2">
        <div className="text-[9px]">-{numberOfRows}-</div>
        <SystemsPagination totalRows={allContracts?.length} setPage={setPage} page={page}/>
        </div>
      </div>
      }
    </div>
  )
}

export default ContractMain
