import axios from "axios";

export const GetAllTaxApi=async(setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}tax`)
    response && setLoading(false)

    return response;
  }
  catch(error:any){
    error && setLoading(false)
  }
}