import { GetEstateContracts } from "@/api/estate/GetEstateContracts"
import SystemsPagination from "@/components/systems/SystemsPagination";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EstateNestedTable = ({data}:any) => {
  const [contracts,setContracts]=useState<any>(null);
  const [page,setPage]=useState<any>(1);
  const [limit,setLimit]=useState<any>(1);
  const [meta,setMeta]=useState<any>(null);
  const [currentContract,setCurrentContract]=useState<any>(null);
  const getEstateContract=async(id:any)=>{
    const result=await GetEstateContracts(id,page,limit);
    result && setContracts(result?.data?.data);
    result && setMeta(result?.data?.meta);
  }

  useEffect(()=>{
    getEstateContract(data?._id);
  },[data,page,limit])
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
      {
        contracts?.map((contract:any)=>{
          return <div className="bg-[#0077bc] text-white p-1 px-4 cursor-pointer"
          onClick={()=>{
            setCurrentContract(contract?.ContractId)
          }}
          >
            {contract?.ContractId?.Type=="tenant"?"مؤجر":"مستأجر"}{" - "}{contract?.ContractId?.Name} {" - "} {contract?.ContractId?.NickName}
          </div>
        })
      }
      </div>
      <div className="flex items-center justify-end">
      {
        contracts?.length>0 && (
          <SystemsPagination
            page={page}
            setPage={setPage}
            totalRows={meta?.numberOfRows}
            rowsPerPage={limit}
            setRowsPerPage={setLimit}
          />
        )
      }
      </div>
     <div className="py-4">
      {
        currentContract && (
          <div>
            <p>
            الصفه: {currentContract?.Type=="tenant"?"مؤجر":"مستأجر"}
            </p>
            <p>
            الاسم: {currentContract?.Name}
            </p>
            <p>
            الاسم المستعار: {currentContract?.Name}
            </p>
            <p>
            الرقم الضريبي: {currentContract?.TaxNumber}
            </p>
            <Link to="/systems" className="flex items-center gap-1"
            onClick={()=>{
              Cookies.set("currentContractForSystems",currentContract?._id);
              Cookies.set("ContractObjForSystems",(currentContract?.Name+" - "+currentContract?.NickName+"-"+(currentContract?.Type=="tenant"?"مؤجر":"مستأجر") ));
              Cookies.set("estateNameForSystems",data?.EstateName);
            }}
            >
              الانتقال الي الدفعات الخاصه بهذا العقد مع هذا العقار
              <p className="underline text-[#0077bc]">اضغط هنا</p>
            </Link>
          </div>
        )
      }
     </div>
    </div>
  )
}

export default EstateNestedTable
