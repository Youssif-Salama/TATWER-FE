import axios from "axios";
import Cookies from "js-cookie";

export const GetOneTaskApi=async(id:string)=>{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}task/${id}`,{
        headers: {
          token: Cookies.get("token"),
        }
      })
    return response;
}