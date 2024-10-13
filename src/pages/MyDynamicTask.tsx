import { GetOneTaskApi } from "@/api/tasks/GetOneTaskApi";
import { GetOneTaskFilesApi } from "@/api/tasks/taskFiles/GetOneTaskFilesApi";
import MyDynamicTaskMeta from "@/components/dynamicTask/MyDynamicTaskMeta";
import MyTaskBody from "@/components/dynamicTask/MyTaskBody";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const MyDynamicTask = () => {
  const { id }:any= useParams();
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [currentTaskFiles, setCurrentTaskFiles] = useState<any>(null);

  const getCurrentTask = async () => {
    try {
      const result = await GetOneTaskApi(id);
      if (result && result.data && result.data.data) {
        setCurrentTask(result.data.data[0]);
      } else {
        console.error('Task not found or unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const getCurrentTaskFiles=async(id:string)=>{
    const result=await GetOneTaskFilesApi(id,"task");
    result && setCurrentTaskFiles(result.data.data[0]);
  }

  useEffect(() => {
    if (id) {
      getCurrentTask();
      getCurrentTaskFiles(id);
    }
  }, [id]);

  return (
    <div className="py-8">
      <Helmet title={`شركة تطوير البوادي | صفحه المهمة رقم ${currentTask?._id}`} />
      <MyDynamicTaskMeta currentTask={currentTask} currentTaskFiles={currentTaskFiles} />
      <MyTaskBody />
    </div>
  );
};

export default MyDynamicTask;
