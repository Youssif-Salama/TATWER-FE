import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateTaskFilesApi=async(data:any,setLoading:any,taskFileId:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.put(`${import.meta.env.VITE_BASE_URL}task-files/${taskFileId}`,data,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    response && setLoading(false)
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "Server Error");
  }
}
