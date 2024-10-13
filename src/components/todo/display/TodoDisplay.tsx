import { DeleteTaskApi } from "@/api/tasks/DeleteTaskApi";
import { GetAllTasks } from "@/api/tasks/GetAllTasks";
import { UpdateTaskApi } from "@/api/tasks/UpdateTaskApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TodoDisplay = () => {
  const [loadingForGet, setLoadingForGet] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);
  const [page,setPage]=useState<number>(1)
  const getAllTasks = async () => {
    const result = await GetAllTasks(setLoadingForGet,page);
    result && setTasks(result?.data?.data);
    result && setMeta(result?.data?.meta);
  };

  useEffect(() => {
    getAllTasks();
  }, [page]);


  const updateTaskStatus=async(task:any)=>{
    let status="pending";
    if(task.Status==="pending"){
      status="completed"
    }
    else{
      status="pending"
    }
    const result = await UpdateTaskApi({ Status: status }, task._id);
    result && getAllTasks();
    result && setPage(page);
  }

  return (
    <div className="py-8 text-gray-700">
      {loadingForGet && (
        <div className="flex items-center justify-center min-h-[70vh]">
          <LoadingSpinner />
        </div>
      )}
      {!loadingForGet && tasks.length > 0 ? (
        <>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
          {tasks?.map((task: any) => {
            return (
              <div className="border border-[#0077bc] rounded-md bg-gray-100 shadow-md p-2 relative flex flex-col h-full">
              <div className="text-[#0077bc] font-semibold pl-5">
                {task?.Title}
              </div>
              <div className="text-[12px] pl-5 mt-2 min-h-[5vh] break-words">
                {task?.Description?.substring(0, 100) + "..."}
              </div>
              <div className="absolute top-2 text-[12px] flex flex-col gap-2 left-2">
                <div>
                  <FaTrash className="text-red-500 cursor-pointer"
                  onClick={async()=>{
                    const result =await DeleteTaskApi(task._id);
                    result && getAllTasks();
                  }}
                  />
                </div>
                <div>
                  <FaEdit className="text-green-500 cursor-pointer"
                  onClick={()=>{
                    Cookies.set("currentTaskId",task._id);
                    window.location.href = "/todo";
                  }}
                  />
                </div>
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
        </>

      ) : (
        <div className="min-h-[70vh] flex items-center justify-center">
          لا يوجد مهام
        </div>
      )}
    </div>
  );
};

export default TodoDisplay;
