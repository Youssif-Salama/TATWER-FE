import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const ResetPasswordApi=async(data:any,setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.post(`${import.meta.env.VITE_BASE_URL}employee/reset-password-now`,data)
    response && setLoading(false)
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "Server Error");
  }
}