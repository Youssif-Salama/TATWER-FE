import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateMyDataApi=async(data:any,setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.put(`${import.meta.env.VITE_BASE_URL}employee/update`,data,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    response && successToaster(response?.data?.message);
    response && setLoading(false);
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "خطأ ف العمليه");
  }
}