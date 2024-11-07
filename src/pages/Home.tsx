import CalendarComponent from "@/components/home/Calender";
import ClockNow from "@/components/home/ClockNow";
import EmployeesReports from "@/components/home/EmployeesReports";
import MinSystemInfo from "@/components/home/MinSystemInfo";
import Reports from "@/components/home/Reports";
import TasksReports from "@/components/home/TasksReports";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div className="py-8 min-h-screen flex justify-center flex-col w-full">
            <Helmet title="شركه تطوير البوادي | الصفحة الرئيسية">

            </Helmet>
           <div className="w-full">
           <Reports/>
            <div className="grid grid-cols-2  gap-2 my-2 mt-6">
                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100'>
                <EmployeesReports/>
                <div className="text-[12px] text-[#0077bc]">
                    <div className="flex gap-2">
                    <p className="bg-[#0077bc] w-[5px] h-[5px]"></p>
                    <p>الموظفون النشطاء</p>
                    </div>
                    <div className="flex gap-2 text-[#8eaccd]">
                    <p className="bg-[#8eaccd] w-[5px] h-[5px]"></p>
                    <p>الموظفون الغير نشطون</p>
                    </div>
                </div>
                </div>
                <div className='shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100'>
                <TasksReports/>
                </div>
                <div className="shadow-md border border-[#0077bc] p-2 rounded-md bg-gray-100">
                    <MinSystemInfo/>
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
