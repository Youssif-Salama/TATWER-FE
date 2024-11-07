import { useEffect, useState } from "react";
import SystemsTable from "./SystemsTable"
import { GetAllSystemsApi } from "@/api/systems/GetAllSystemsApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import SystemsPagination from "./SystemsPagination";
import SystemsFeatures from "./SystemsFeatures";
import SystemsNotes from "./SystemsNotes";
import { MdTipsAndUpdates } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NotAllowedLayer from "@/common/NotAllowedLayer";
import Cookies from "js-cookie";
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";





const SystemsCollection = () => {
  const [allSystems,setAllSystems] = useState<any>([]);
  const [loading,setLoading] = useState<boolean>(true);
  const [page,setPage] = useState<number>(1);
  const [totalRows,setTotalRows] = useState<number>(10);

  const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showWay, setShowWay] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState<any>("unpaid");

  const [openNotes,setOpenNotes] = useState<boolean>(false);
  const [no,setNo]=useState<number>(6);

  const {refreshOnApplyOrSetSystemMessage}=useSelector((state:RootState)=>state.GlobalReducer)
  const [rowsPerPage,   setRowsPerPage] = useState<number>(10);

  const getAllSystems=async()=>{
    const result = await GetAllSystemsApi(isApplied,setLoading,page,showWay,searchKeyWord,searchValue,startDate,endDate,no,rowsPerPage);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllSystems(result?.data?.data);
  }

  useEffect(()=>{
    getAllSystems();
  },[page,searchKeyWord,searchValue,showWay,startDate,endDate,refreshOnApplyOrSetSystemMessage,isApplied,no,rowsPerPage])

  const token=Cookies.get("token");
  const [decodedToken,setDecodedToken]=useState<any>(null);
  useEffect(()=>{
    if(token){
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  },[token])

  return (
   <>
   {
    (!checkAuth(decodedToken,"get",["systems","system"]))?<NotAllowedLayer />
    : <div className="py-8 flex flex-col gap-4 relative">
    <div className="flex justify-end fixed top-0 left-0 z-[1000] m-4">
      <div className="absolute top-0 left-0 text-[19px] text-white bg-[#0077bc] cursor-pointer p-1 rounded-full border-white border-2"
      onClick={()=>{
        setOpenNotes(!openNotes)
      }}
      >
      <MdTipsAndUpdates />
      </div>
      <div className={`${openNotes ? "block" : "hidden"}`}>
      <SystemsNotes/>
      </div>
    </div>
    <div className="w-full flex items-center justify-start">
      <div className="bg-[#0077bc] p-1 text-white font-bold cursor-pointer flex gap-1 items-center justify-center">
        <span
        onClick={()=>{
          setIsApplied("paid")
        }}
        className={`${ isApplied==="paid"?"bg-[#fff] text-[#0077bc]":""} p-1`}>تم دفعها</span>
        <span
        onClick={()=>{
          setIsApplied("unpaid")
        }}
        className={`${ isApplied==="unpaid"?"bg-[#fff] text-[#0077bc]":""} p-1`}>لم يتم دفعها</span>
          <span
        onClick={()=>{
          setIsApplied("stop")
        }}
        className={`${ isApplied==="stop"?"bg-[#fff] text-[#0077bc]":""} p-1`}> تم ايقافها</span>
      </div>
    </div>
    <div>
      <SystemsFeatures
      setNo={setNo}
      no={no}
      setSearchKeyWord={setSearchKeyWord}
      setSearchValue={setSearchValue}
      searchKeyWord={searchKeyWord}
      setShowWay={setShowWay}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      startDate={startDate}
      endDate={endDate}
      />
    </div>
    <div>
      {
        loading ? <div className="min-h-[70vh] flex items-center justify-center"><LoadingSpinner/></div> :
        <SystemsTable allSystems={allSystems} />
      }
    </div>
    {allSystems.length>0 &&
    <div className="flex items-center justify-center">
      <SystemsPagination totalRows={totalRows} setPage={setPage} page={page} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
    </div>
    }
  </div>
   }
   </>
  )
}

export default SystemsCollection
