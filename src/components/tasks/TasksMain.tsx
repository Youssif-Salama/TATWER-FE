import { GetMyTasks } from "@/api/tasks/GetMyTasks"
import { UpdateTaskApi } from "@/api/tasks/UpdateTaskApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useEffect, useState } from "react"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TasksMain = () => {
  const [result,setResult]=useState<any>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [page,setPage]=useState<any>(1);
  const [meta, setMeta] = useState<any>(null);


  const getMyTasks=async()=>{
    const result=await GetMyTasks(setLoading,page);
    result && setResult(result?.data?.data);
    result && setMeta(result?.data?.meta);
  }


  useEffect(()=>{
    getMyTasks()
  },[page])


  const updateTaskStatus=async(task:any)=>{
    let status="pending";
    if(task.Status==="pending"){
      status="completed"
    }
    else{
      status="pending"
    }
    const result = await UpdateTaskApi({ Status: status }, task._id);
    result && getMyTasks();
    result && setPage(page);
  }



  return (
    <div className="py-8 text-gray-700">
    {loading && (
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    )}
    {!loading && result.length > 0 ? (
      <>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {result?.map((task: any) => {
          return (
            <div className="border border-[#0077bc] rounded-md bg-gray-100 shadow-md p-2 relative flex flex-col h-full">
            <div className="text-[#0077bc] font-semibold pl-5">
              {task?.Title}
            </div>
            <div className="text-[12px] pl-5 mt-2 min-h-[5vh] break-words">
              {task?.Description?.substring(0, 100) + "..."}
            </div>
            <div className="absolute top-2 text-[12px] flex flex-col gap-2 left-2">
              <Link to={`/tasks/${task._id}`}>
                <FaEye className="text-[#0077bc] cursor-pointer" />
              </Link>
            </div>
            <div className="mt-auto">
              <div className="flex items-center justify-between text-[12px]">
                <div>{task.Status == "pending" ? "قيد المراجعة" : "تم التنفيذ"}</div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={task.Status == "pending" ? false : true}
                    onClick={ () => {
                      updateTaskStatus(task);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0077bc]"></div>
                </label>
              </div>
            </div>
          </div>

          );
        })}

      </div>
      {
        meta?.numberOfRows>10 &&
        <div className="flex justify-center ">
      <div className="pagination mt-6 flex items-cneter gap-2 text-[#0077bc]">
      <div className="cursor-pointer"
      onClick={()=>{
        meta?.nextPage && setPage((prev:number)=>prev+1)
      }}
      ><FaArrowAltCircleRight/></div>
      <div className="text-[12px]">{meta?.currentPage}/{Math.ceil(meta?.numberOfRows/10)}</div>
      <div className="cursor-pointer"
      onClick={()=>{
        meta?.prevPage && setPage((prev:number)=>prev-1)
      }}
      ><FaArrowAltCircleLeft/></div>
      </div>
    </div>
      }
      </>

    ) : (
      <div className="min-h-[70vh] flex items-center justify-center">
        لا يوجد مهام
      </div>
    )}
  </div>
  )
}

export default TasksMain
