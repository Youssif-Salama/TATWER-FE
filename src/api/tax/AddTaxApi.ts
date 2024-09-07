import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const AddTaxApi=async(data:any,setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.post(`${import.meta.env.VITE_BASE_URL}tax`,data)
    response && setLoading(false)
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && setLoading(false)
    error && errorToaster(error.response.data.message || "Server Error");
  }
}