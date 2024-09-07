import axios from "axios";

export const GetAllPaymentWaysApi=async(setLoading:any)=>{
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}payment-way`)
    response && setLoading(false)

    return response;
  }
  catch(error:any){
    error && setLoading(false)
  }
}