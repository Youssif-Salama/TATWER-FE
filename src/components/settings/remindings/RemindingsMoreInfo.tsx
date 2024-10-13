import { AddEmployeeRemindingsInfoApi, GetEmployeeRemindingsInfoApi } from "@/api/employee/RemindingsData";
import { useEffect, useState } from "react";

const RemindingsMoreInfo = () => {
  const [employeeRemindings, setEmployeeRemindings] = useState<any>([]);
  const [EmailForRemindings, setEmailForRemindings] = useState("");
  const [AppPassword, setAppPassword] = useState("");


  const getEmployeeRemindings = async () => {
    const result= await GetEmployeeRemindingsInfoApi();
    result&&setEmployeeRemindings(result?.data?.data);
  }
  useEffect(()=>{
    getEmployeeRemindings();
  },[])


  const addRemindingsInfo=async()=>{
  await AddEmployeeRemindingsInfoApi({EmailForRemindings,AppPassword});
  }

  return (
    <div className="p-4 mt-6">
      <h3 className="text-[#0077bc] font-semibold text-[12px] mb-2">
        بيانات التذكيرات
      </h3>
      <div className="bg-gray-100 w-full border border-[#0077bc] rounded-md shadow-md text-[12px] p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="w-[100px]">البريد الالكتروني</p>
          <p className="w-full">
            <input
            onChange={(e)=>setEmailForRemindings(e.target.value)}
            type="email" className="p-1 w-full border outline-none rounded-md" placeholder={employeeRemindings?.EmailForRemindings || "البريد الالكتروني هنا"} />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="w-[100px]">كلمه مرور التطبيقات</p>
          <p className="w-full">
            <div className="alert text-red-500 text-[10px]">*احذر من مشاركه كلمه مرورك</div>
            <input
            onChange={(e)=>setAppPassword(e.target.value)}
            type="text" className="p-1 w-full border outline-none rounded-md" placeholder=" كلمه مرور التطبيقات هنا" />
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button
          onClick={()=>{
            addRemindingsInfo();
          }}
          type="button" className="px-4 py-2 bg-[#0077bc] rounded-md text-white hover:bg-[#0077bcc8] transition-all duration-200">التأكيد</button>
        </div>
      </div>
    </div>
  );
};

export default RemindingsMoreInfo;
