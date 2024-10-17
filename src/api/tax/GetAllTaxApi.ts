import axios from "axios";
import Cookies from "js-cookie";

export const GetAllTaxApi=async(setLoading?:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}tax`,{
      headers:{
        token:Cookies.get("token")
      }
    })
    response && setLoading(false)

    return response;
  }
  catch(error:any){
    error && setLoading(false)
  }
}


export const GetChoosedTaxApi=async(choosed:boolean)=>{
  try{
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}tax/${choosed}`,{
      headers:{
        token:Cookies.get("token")
      }
    })
    return response;
  }
  catch(error:any){
  }
}