import axios from "axios";
import Cookies from "js-cookie";

export const GetAllSystemsForReports = async (type:any,id:any,setLoading:any,page:any,startDate:any,endDate:any) => {
  let queries=`?page=${page}`;
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);


  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/${id}/reports/${type}/${queries}`,
      {
        headers: {
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
