import { useFormik } from "formik";
import TodoAddMain from "./TodoAddMain";
import TodoAddFiles from "./TodoAddFiles";
import { Button } from "@/componentsShadcn/ui/button";
import { AddTaskApi } from "@/api/tasks/AddTaskApi";
import { useEffect, useState } from "react";
import { AddTaskFilesApi } from "@/api/tasks/taskFiles/AddTaskFilesApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import { GetOneTaskApi } from "@/api/tasks/GetOneTaskApi";
import { GetOneTaskFilesApi } from "@/api/tasks/taskFiles/GetOneTaskFilesApi";
import { UpdateTaskFilesApi } from "@/api/tasks/taskFiles/UpdateTaskFilesApi";
import { UpdateTaskApi } from "@/api/tasks/UpdateTaskApi";

const TodoAdd = () => {
  const MainFormik = useFormik<any>({
    initialValues: {
      Title: "",
      Description: "",
      Priority: "",
      StartDate: "",
      DueDate: "",
    },
    onSubmit: () => {},
  });

  const FilesFormik = useFormik<any>({
    initialValues: {
      File: "",
      FileMessage: "",
      Type: "task",
      FixedFiles: "",
    },
    onSubmit: () => {},
  });

  const [loading,setLoading]=useState<boolean>(false);
  const [currentTask,setCurrentTask]=useState<any>(null);

  const getCurrentTask=async(id:any)=>{
    if(Cookies.get("currentTaskId")!==undefined){
      const result=await GetOneTaskApi(id);
      if(result){
        setCurrentTask(result.data.data[0])
      }
     }
  }

  useEffect(()=>{
    const currentTaskId=Cookies.get("currentTaskId");
    getCurrentTask(currentTaskId);
  },[])

  useEffect(()=>{
    if(currentTask){
      MainFormik.setFieldValue("Title",currentTask.Title);
      MainFormik.setFieldValue("Description",currentTask.Description);
      MainFormik.setFieldValue("Priority",currentTask.Priority);
      MainFormik.setFieldValue("StartDate",currentTask.StartDate);
      MainFormik.setFieldValue("DueDate",currentTask.DueDate);
    }

  },[currentTask])









  const [currentTaskFiles,setCurrentTaskFile]=useState<any>(null);

  const getCurrentTaskFiles=async(id:any)=>{
    if(Cookies.get("currentTaskId")!==undefined){
      const result=await GetOneTaskFilesApi(id,"task");
      if(result){
        setCurrentTaskFile(result.data.data[0])
      }
     }
  }

  useEffect(()=>{
    const currentTaskId=Cookies.get("currentTaskId");
    getCurrentTaskFiles(currentTaskId);
  },[])


  useEffect(()=>{
    if(currentTaskFiles){
      FilesFormik.setFieldValue("FileMessage",currentTaskFiles.FileMessage);
    }
  },[currentTaskFiles])




  const submitTask=async()=>{
   if(Cookies.get("currentTaskId")==undefined){
    const result=await AddTaskApi(MainFormik.values,setLoading);
    if(result && FilesFormik.values.File.length>0){
      const formData=new FormData();
       // @ts-ignore
      Object.entries(FilesFormik.values.File).forEach(([key,value]:any)=>{
        formData.append("File",value);
      })
      formData.append("FileMessage",FilesFormik.values.FileMessage);
      formData.append("Type",FilesFormik.values.Type);
     await AddTaskFilesApi(formData,setLoading,result.data.data._id);
    }
   }
    else{
      const result=await UpdateTaskApi(MainFormik.values,Cookies.get("currentTaskId"),setLoading);
    if(result && FilesFormik.values.FileMessage.length>0 || FilesFormik.values.File.length>0){
      const formData=new FormData();
       // @ts-ignore
      Object.entries(FilesFormik.values.File).forEach(([key,value]:any)=>{
        formData.append("File",value);
      })
      formData.append("FileMessage",FilesFormik.values.FileMessage);
      formData.append("Type",FilesFormik.values.Type);
      formData.append("FixedFiles",FilesFormik.values.FixedFiles);
     if(currentTaskFiles){
      await UpdateTaskFilesApi(formData,setLoading,currentTaskFiles._id);
     }
     else{
      await AddTaskFilesApi(formData,setLoading,Cookies.get("currentTaskId"));
     }
    }
    }
  }

  return (
    <div className="flex flex-col gap-4 py-8">
        <div>
          <TodoAddMain formik={MainFormik}  currentMaintask={currentTask}/>
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-full h-0.5 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <div>
          <TodoAddFiles formik={FilesFormik} currentTaskFiles={currentTaskFiles}/>
        </div>
        <Button type="button" className="w-full mt-6 bg-[#0077bc] hover:bg-[#0077bcd7] rounded-none"
          onClick={()=>{
            submitTask()

          }}
        >
          {loading ? <LoadingSpinner color="text-white"/> : currentTask ? "تعديل المهمه" : "اضافة المهمه"}
        </Button>
    </div>
  );
};

export default TodoAdd;
