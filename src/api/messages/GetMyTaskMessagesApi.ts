import axios from "axios";
import Cookies from "js-cookie";

export const GetMyTaskMessagesApi=async(taskId:any,allMessage:any,setAllMessages:any,page:any,setPage:any)=>{
  try{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}messages/task/${taskId}?page=${page}&sort=createdAt&dir=asc`,{
      headers:{
        token:Cookies.get("token")
      }
    })
    response && setAllMessages( [...allMessage,...response?.data?.data]);
    if(response?.data?.meta?.nextPage){
      setPage(page+1)
    }
    return response;
  }
  catch(error:any){
  }
}