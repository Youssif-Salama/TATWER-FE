import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const GetAllOrdersApi=async(setLoading:any,page
  :any,limit:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}orders?page=${page}&limit=${limit}`,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    response && setLoading(false)
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "Server Error");
  }
}