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
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const [openNotes,setOpenNotes] = useState<boolean>(false);

  const {refreshOnApplyOrSetSystemMessage}=useSelector((state:RootState)=>state.GlobalReducer)

  const getAllSystems=async()=>{
    const result = await GetAllSystemsApi(isApplied,setLoading,page,showWay,searchKeyWord,searchValue,startDate,endDate);
    result && setTotalRows(result?.data?.meta?.numberOfRows);
    result && setAllSystems(result?.data?.data);
  }

  useEffect(()=>{
    getAllSystems();
  },[page,searchKeyWord,searchValue,showWay,startDate,endDate,refreshOnApplyOrSetSystemMessage,isApplied])

  return (
    <div className="py-8 flex flex-col gap-4 relative">
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
            setIsApplied(true)
          }}
          className={`${ isApplied?"bg-[#fff] text-[#0077bc]":""} p-1`}>تم دفعها</span>
          <span
          onClick={()=>{
            setIsApplied(false)
          }}
          className={`${ isApplied?"":"bg-[#fff] text-[#0077bc]"} p-1`}>لم يتم دفعها</span>
        </div>
      </div>
      <div>
        <SystemsFeatures
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
        <SystemsPagination totalRows={totalRows} setPage={setPage} page={page}/>
      </div>
      }
    </div>
  )
}

export default SystemsCollection
