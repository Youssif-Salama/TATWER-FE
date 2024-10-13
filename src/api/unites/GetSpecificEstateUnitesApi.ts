import axios from "axios";
import Cookies from "js-cookie";

export const GetSpecificEstateUnitesApi=async(estateId:any,setLoading:any,page:number,searchKeyWord?:any,searchValue?:any)=>{
  let queries=`?page=${page}`;
  searchKeyWord ? (queries+=`&keyWord=${searchKeyWord}`):(queries+=`&keyWord=UniteName`);
  searchValue && (queries+=`&value=${searchValue}`);
  try{
    setLoading(true)
    const response:any=await axios.get(`${import.meta.env.VITE_BASE_URL}estate/${estateId}/unites${queries}`,
    {
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
