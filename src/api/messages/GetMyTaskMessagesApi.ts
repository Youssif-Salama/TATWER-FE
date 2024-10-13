import axios from "axios";
import Cookies from "js-cookie";

export const GetMyTaskMessagesApi=async(taskId:any,setAllMessages:any)=>{
  try{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}messages/task/${taskId}?&sort=createdAt&dir=asc`,{
      headers:{
        token:Cookies.get("token")
      }
    })
    response && setAllMessages(response?.data?.data);
    return response;
  }
  catch(error:any){
  }
}