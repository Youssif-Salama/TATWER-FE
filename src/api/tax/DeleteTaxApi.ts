import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteTaxApi=async(taxId:any)=>{
  try{
    const response:any=await axios.delete(`${import.meta.env.VITE_BASE_URL}tax/${taxId}`,{
      headers:{
        token:Cookies.get("token")
      }
    })
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && errorToaster(error.response.data.message || "Server Error");
  }
}