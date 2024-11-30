import { AddLandLordFilesApi } from "@/api/landlordFiles/AddLandLordFilesApi";
import { GetAllLandlordsFiles } from "@/api/landlordFiles/GetAllLandlordsFiles";
import { UpdateLandlordFiles } from "@/api/landlordFiles/UpdateLandlordFiles";
 // @ts-ignore
import { AddTenantFile } from "@/api/tenantFiles/AddTenantFile";
 // @ts-ignore
import { getAllUniteFiles } from "@/api/tenantFiles/GetAllUniteFiles";
 // @ts-ignore
import { UpdateTenantFiles } from "@/api/tenantFiles/UpdateTenantFiles";
import AddFiles from "@/components/DynamicUnite.tsx/AddFiles";
import CurrentFiles from "@/components/DynamicUnite.tsx/CurrentFiles";
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation, useParams } from "react-router-dom";

const DynamicLandlordUnites = () => {
   // @ts-ignore
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentFiles,setCurrentFiles]=useState<any>();
  const [Files,setFiles]=useState<any>([]);
  const [Names,setNames]=useState<any>([]);
  const [FixedFiles,setFixedFiles]=useState<any>();
  const [currentFileId,setCurrentFileId]=useState<any>(null);

  const getUniteFiles=async()=>{
    const data={
      ContractId:queryParams.get("contractId"),
      UniteId:queryParams.get("uniteId")
    }
    const result:any=await GetAllLandlordsFiles(data);
    result && setCurrentFiles(result?.data[0]?.Files);
    result &&setCurrentFileId(result?.data[0]?._id);

  }


  useEffect(()=>{
    getUniteFiles();
  },[])



 const handleClick=async()=>{
  if(!currentFiles || currentFiles?.length==0){
    const formData=new FormData();
    formData.append("Names",JSON.stringify(Names));
    Array.from(Files).forEach((element:any) => {
      formData.append("File",element)
    });
    // @ts-ignore
    formData.append("contractId",queryParams.get("contractId"));
    // @ts-ignore
    formData.append("uniteId",queryParams.get("uniteId"))
    await AddLandLordFilesApi(formData)
  }
  else{
    const formData=new FormData();
    formData.append("Names",JSON.stringify(Names));
    formData.append("FixedFiles",JSON.stringify(FixedFiles));
    Array.from(Files).forEach((element:any) => {
      formData.append("File",element)
    });
    await UpdateLandlordFiles(formData,currentFileId)
  }
 }


  return (
<div className="flex flex-col min-h-screen py-8 w-full">
  <div className="flex items-end justify-end w-full mb-2">
    <Link to={`/estates/create`} className="flex items-center gap-2 text-slate-400 text-[12px]">
      <p>العوده</p>
      <p><FaArrowLeft /></p>
    </Link>
  </div>
  <div className="flex-grow">
    <CurrentFiles files={currentFiles} setFixedFiles={setFixedFiles} FixedFiles={FixedFiles} />
    <AddFiles Files={Files} setFiles={setFiles} Names={Names} setNames={setNames} />
  </div>
  <div className="mt-6">
    <button className="bg-[#0077bc] w-full hover:bg-[#0077bcdb] p-2 text-white"
    onClick={()=>{
      handleClick();
    }}
    >
      {!currentFiles || currentFiles.length === 0 ? "اضافه" : "تعديل"}
    </button>
  </div>
</div>

  )
}

export default DynamicLandlordUnites
