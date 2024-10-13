import axios from "axios";
import Cookies from "js-cookie";

export const GetAllRemindingsApi=async()=>{
  try{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}remindings`,{
      headers: {
      token: Cookies.get("token"),
      }
    })
    return response;
  }
  catch(error:any){
  }
}