import { GetAllSystemsApi } from "@/api/systems/GetAllSystemsApi";
import CalendarComponent from "@/components/home/Calender";
import ClockNow from "@/components/home/ClockNow";
import DiplayAllContractsSimple from "@/components/home/DiplayAllContractsSimple";
import DisplayAllContractsLandlordsSimple from "@/components/home/DisplayAllContractsLandlordsSimple";
// import EmployeesReports from "@/components/home/EmployeesReports";
// import MinSystemInfo from "@/components/home/MinSystemInfo";
// import MinSystemInfoLandlord from "@/components/home/MinSystemInfoLandlord";
import Reports from "@/components/home/Reports";
import TaskOrderTable from "@/components/home/TaskOrderTable";
import TasksReports from "@/components/home/TasksReports";
import SystemsTable from "@/components/systems/SystemsTable";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Home = () => {
    const [allSystems,setAllSystems] = useState<any>([]);
    // @ts-ignore
    const [loading,setLoading] = useState<boolean>(true);
    // @ts-ignore
    const [page,setPage] = useState<number>(1);
    // @ts-ignore
    const [totalRows,setTotalRows] = useState<number>(10);
    // @ts-ignore
    const [searchKeyWord, setSearchKeyWord] = useState<string | null>(null);
    // @ts-ignore
    const [searchValue, setSearchValue] = useState<string | null>(null);
    // @ts-ignore
    const [showWay, setShowWay] = useState<string | null>("asc");
    // @ts-ignore
    const [startDate, setStartDate] = useState<string | null>(null);
    // @ts-ignore
    const [endDate, setEndDate] = useState<string | null>(null);
    // @ts-ignore
    const [isApplied, setIsApplied] = useState<any>("unpaid");
    // @ts-ignore
    const [openNotes,setOpenNotes] = useState<boolean>(false);
    // @ts-ignore
    const [no,setNo]=useState<number>(6);
    // @ts-ignore
    const {refreshOnApplyOrSetSystemMessage}=useSelector((state:RootState)=>state.GlobalReducer)
    // @ts-ignore
    const [rowsPerPage,   setRowsPerPage] = useState<number>(10);
    const currentContractForSystems=Cookies.get("currentContractForSystems");
    const contractIds=Cookies.get("contractIds");      const getAllSystems=async()=>{
        const result = await GetAllSystemsApi(isApplied,setLoading,page,showWay,searchKeyWord,searchValue,startDate,endDate,no,rowsPerPage,currentContractForSystems,contractIds);
        result && setTotalRows(result?.data?.meta?.numberOfRows);
        result && setAllSystems(result?.data?.data);
      }
    useEffect(()=>{
        getAllSystems();
    },[])
    return (
        <div className="py-8 min-h-screen flex justify-center flex-col w-full">
            <Helmet title="شركه تطوير البوادي | الصفحة الرئيسية">

            </Helmet>
           <div className="w-full">
           <Reports/>
            <div className="grid grid-cols-2  gap-2 my-2 mt-6">

                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100'>
                    <DiplayAllContractsSimple/>
                </div>
                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100'>
                    <DisplayAllContractsLandlordsSimple/>
                </div>
                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100 col-span-2'>
                {/* <EmployeesReports/>
                <div className="text-[12px] text-[#0077bc]">
                    <div className="flex gap-2">
                    <p className="bg-[#0077bc] w-[5px] h-[5px]"></p>
                    <p>الموظفون النشطاء</p>
                    </div>
                    <div className="flex gap-2 text-[#8eaccd]">
                    <p className="bg-[#8eaccd] w-[5px] h-[5px]"></p>
                    <p>الموظفون الغير نشطون</p>
                    </div>
                </div> */}
                <TaskOrderTable/>
                </div>

                <div className="shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100 col-span-2">
                    {/* <MinSystemInfo/> */}
                    <SystemsTable allSystems={allSystems} />
                </div>
                {/* <div className="shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100">
                    <MinSystemInfoLandlord/>
                </div> */}
                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100'>
                <TasksReports/>
                </div>
                <div className="shadow-md border border-[#0077bc] bg-gray-100 text-[#0077bc] p-2 rounded-md text-[5vw] flex flex-col"
                style={{ fontFamily: 'Cairo, sans-serif',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}
                >
                    {/* clock */}
                    <div className="text-[14px]"><ClockNow/></div>
                    {/* calender */}
                    <div className="text-[14px]"><CalendarComponent/></div>
                </div>
            </div>
           </div>
        </div>
    );
}

export default Home;
