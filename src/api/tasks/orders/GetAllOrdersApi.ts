import axios from "axios";
import Cookies from "js-cookie";

export const GetAllOrdersApi=async(setLoading:any,page
  :any,limit:any,status:any,searchValue:any)=>{
  try{
    let queryCriteria=`?page=${page}&limit=${limit}`;
    (status && status!=="all") && (queryCriteria+=`&status=${status}`);
    searchValue && (queryCriteria+=`&searchValue=${searchValue}`);
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}orders${queryCriteria}`,{
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