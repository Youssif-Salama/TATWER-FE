import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const SendMessageApi=async(data:any,setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.post(`${import.meta.env.VITE_BASE_URL}messages`,data,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    response && setLoading(false);
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "Server Error");
  }
}