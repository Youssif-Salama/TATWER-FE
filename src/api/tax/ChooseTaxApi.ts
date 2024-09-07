import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const ChooseTaxApi=async(taxId:any)=>{
  try{
    const response:any=await axios.put(`${import.meta.env.VITE_BASE_URL}tax/choose/${taxId}`,)
    response && successToaster(response?.data?.message);
    return response;
  }
  catch(error:any){
    error && errorToaster(error.response.data.message || "Server Error");
  }
}