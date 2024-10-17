import { GetAllTasksNoWithStatusApi } from '@/api/reports/GetAllReportsApi';
import { GetAllTasks } from '@/api/tasks/GetAllTasks';
import  { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

const TasksReports = () => {
  const [taskReports, setTaskReports] = useState<any>([]);
  const navigate=useNavigate();
  // Fetch the data when the component mounts
  const getTaskReports = async () => {
    try {
      const result = await GetAllTasksNoWithStatusApi();
      if (result && result.data) {
        setTaskReports(result.data);
      } else {
        console.error("No data returned from API");
      }
    } catch (error) {
      console.error("Error fetching employee reports:", error);
    }
  };

  useEffect(() => {
    getTaskReports();
  }, []);


  const [allTasks, setAllTasks] = useState<any>([]);
  // Fetch the data when the component mounts
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);

  const getAllTasks=async()=>{
    const result=await GetAllTasks(setLoading,1);
    result && setAllTasks(result?.data?.data);
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  const priorityOfTask=(priority:any)=>{
    if(priority==="low"){
      return "قليله"
    }
    if(priority==="medium"){
      return "متوسطه"
    }
    if(priority==="high"){
      return "عاليه"
    }
  }

  const statusOfTask=(status:any)=>{
    if(status==="pending"){
      return "قيد الانتظار"
    }
    if(status==="completed"){
      return "مكتمل"
    }
  }


  return (
    <div className='flex flex-col gap-1 text-[12px]'>
      <div className='flex gap-6'>
        <div className='flex items-start gap-1'>
          <p className='w-[5px] h-[5px] bg-[#1f1f1f]'></p>
          <p className='text-[#1f1f1f] '>{(Number(taskReports[0]?.value) + Number(taskReports[1]?.value)) || 0}</p>
        </div>
        <div className='flex items-start gap-1'>
          <p className='w-[5px] h-[5px] bg-[#0077bc]'></p>
          <p className='text-[#0077bc] '>{taskReports[0]?.value || 0}</p>
        </div>
        <div className='flex items-start gap-1'>
          <p className='w-[5px] h-[5px] bg-[#8eaccd]'></p>
          <p className='text-[#8eaccd] '>{taskReports[1]?.value || 0}</p>
        </div>
      </div>
      <div>
        {
          (allTasks && allTasks?.length>0) ?(<div className="overflow-x-auto rounded-md ">
             <div className="text-[12px] flex items-center justify-between">
          <p className="text-[#0077bc]">المهام</p>
          <Link to="/todo/tasks" className="bg-[#0077bc] px-4 py-1 rounded-md text-white">انتقل</Link>
        </div>
            <table className="table-auto border border-[#0077bc] text-[10px] min-w-full rounded-md overflow-hidden">
              <thead>
                <tr className="bg-[#0077bc] text-white">
                  <th className="font-semibold w-[50px] px-2 py-2">الرمز</th>
                  <th className="font-semibold w-[50px] px-2 py-2">العنوان</th>
                  <th className="font-semibold w-[50px] px-2 py-2">الوصف</th>
                  <th className="font-semibold w-[50px] px-2 py-2">الاهميه</th>
                  <th className="font-semibold w-[50px] px-2 py-2">الحاله</th>
                  <th className="font-semibold w-[50px] px-2 py-2">تاريخ المطالبه</th>
                </tr>
              </thead>
              <tbody className="font-normal text-[8px]">
                {allTasks?.map((system: any, index: number) => {
                  return (
                    <tr key={index} className={`cursor-pointer ${(index%2===0)?"bg-[#0077bc17]":"bg-white"}`}
                    onClick={()=>{
                      navigate("/tasks/"+system?._id)
                    }}
                    >
                      <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-center">{system?.Title}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-center">{system?.Description?.length>50?system?.Description?.slice(0,50)+"...":system?.Description}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-center">{priorityOfTask(system?.Priority)}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-center">{statusOfTask(system?.Status)}</td>
                      <td className="px-2 py-2 whitespace-nowrap text-center">{new Date(system?.DueDate).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>):( <div className="text-[#0077bc] flex items-center justify-center h-[30vh] w-full">لا يوجد دفعات</div>)
        }
      </div>
    </div>
  );
};

export default TasksReports;
