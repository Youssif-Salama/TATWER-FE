import axios from "axios";
import Cookies from "js-cookie";

export const GetAllTasks=async(setLoading:any,page:number)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}task?page=${page}&sort=createdAt&dir=desc`,{
      headers: {
        token: Cookies.get("token"),
      }
    })
    response && setLoading(false)
    return response;
  }
  catch(error:any){
    error && setLoading(false)
  }
}