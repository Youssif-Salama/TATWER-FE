import axios from "axios";
import Cookies from "js-cookie";


export const GetAllContractsForReportsApi = async (page:number,limit:number,setLoading?:any,startDate?:string,endDate?:string) => {

  let queries=`?page=${page}`;
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);
  queries+=`&limit=${limit||10}`;

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/reports${queries}`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false)
  }
};