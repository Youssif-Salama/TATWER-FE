import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const AddLandLordFilesApi=async(data:any)=>{
  try{
    const response:any=await axios.post(`${import.meta.env.VITE_BASE_URL}landlord-files`,data,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && errorToaster(error.response.data.message || "Server Error");
  }
}