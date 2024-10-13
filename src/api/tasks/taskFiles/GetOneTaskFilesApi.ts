import axios from "axios";
import Cookies from "js-cookie";

export const GetOneTaskFilesApi=async(id:string,type:string)=>{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}task/${id}/files/${type}`,{
        headers: {
          token: Cookies.get("token"),
        }
      })
    return response;
}
