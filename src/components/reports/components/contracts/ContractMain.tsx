import {  useEffect, useState } from "react"
import ReportsHead from "../../nav/ReportsHead"
import ContractFilters from "./ContractFilters"
import ContractTable from "./ContractTable";
import { GetAllContractsForReportsApi } from "@/api/reports/GetAllContractsForReportsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import SystemsPagination from "@/components/systems/SystemsPagination";
import { encryptValue } from "@/utils/encrypt";

const ContractMain = () => {
  const [startDate,setStartDate]=useState<any >();
  const [endDate,setEndDate]=useState<any>();
  const [fullView,setFullView]=useState<boolean>(false);
  const [allContracts,setAllContracts]=useState<any>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [page,setPage]=useState<any>(1);
  const [numberOfRows,setNumberOfRows]=useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [pageForDataForPrinting,setPageForDataForPrinting]=useState<any>(1);
  const [waitDataCombine,setWaitDataCombine]=useState<boolean>(false);
  const [pdf,setPdf]=useState<any>(null);
  const [excel,setExcel]=useState<any>(null);




  const callGetAllContracts=async()=>{
    const result=await GetAllContractsForReportsApi(page,rowsPerPage,setLoading,startDate,endDate);
    result&&setAllContracts(result?.data?.data);
    result&&setNumberOfRows(result?.data?.meta?.numberOfRows);
  }

  useEffect(()=>{
    callGetAllContracts();
  },[startDate,endDate,page,rowsPerPage])


  const callAllDataOnClickPrinting = async (typeOfExport:string) => {
    let result: any[] = [];
    let nextPage: string | null = null;
    let currentPage = pageForDataForPrinting;
    typeOfExport=="pdf" && setPdf(true) && setExcel(false);
    typeOfExport=="excel" && setExcel(true) && setPdf(false);
    let callSt = await GetAllContractsForReportsApi(currentPage, 10, setWaitDataCombine, startDate, endDate);
    if (callSt && callSt?.data?.data) {
      result.push(...callSt.data.data);
      nextPage = callSt?.data?.meta?.nextPage;
    }
    while (callSt?.data?.meta?.nextPage) {
      currentPage++;
      setPageForDataForPrinting(currentPage);
      let CallNd = await GetAllContractsForReportsApi(currentPage, 10, setWaitDataCombine, startDate, endDate);
      if (CallNd && CallNd?.data?.data) {
        result.push(...CallNd.data.data);
        nextPage = CallNd?.data?.meta?.nextPage;
      }
      callSt = CallNd;
    }
    if(!nextPage){
      setPdf(null);
      setExcel(null);
    }
    return {nextPage,result};
  };




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
          // onClick={async()=>{
          // const {hasNext,result }:any=await callAllDataOnClickPrinting();
          //   !hasNext && generatePdfForContracts(result,headers,keys,"A1","تطوير-تقرير-العقود")
          // }}
          onClick={async()=>{
            const {hasNext,result }:any=await callAllDataOnClickPrinting("pdf");
            if(!hasNext)
            {
              setPageForDataForPrinting(1);
              localStorage.removeItem("reportContractsPdf");
              const encryptedData=encryptValue(result);
              localStorage.setItem("reportContractsPdf",encryptedData);
              window.open('/reports/contracts/pdf',"_blank")
            }
          }}
          className="bg-[#0077bc] text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">
            {
              (waitDataCombine && pdf) ?"جاري اعاده التوجيه...":"pdf"
            }
          </button>
        </div>
        <div>
          <button
          onClick={async()=>{

            const {hasNext,result }:any=await callAllDataOnClickPrinting("excel");
            if(!hasNext)
            {
              setPageForDataForPrinting(1);
              localStorage.removeItem("reportContractsExcel");
              const encryptedData=encryptValue(result);
              localStorage.setItem("reportContractsExcel",encryptedData);
              window.open('/reports/contracts/excel',"_blank")
            }
          }}

          className="bg-green-500 text-[14px] p-1 px-4 hover:opacity-75 duration-200 transition-all text-white">
            {
              (waitDataCombine && excel) ?"جاري اعاده التوجيه...":"excel"
            }
          </button>
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
        <SystemsPagination totalRows={numberOfRows} setPage={setPage} page={page}
        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
        />
        </div>
      </div>
      }
    </div>
  )
}

export default ContractMain
