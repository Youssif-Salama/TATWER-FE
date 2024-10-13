import axios from "axios";
import Cookies from "js-cookie";

export const GetAllObjectApi=async(setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}object`,{
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