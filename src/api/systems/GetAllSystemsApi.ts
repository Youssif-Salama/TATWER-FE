import axios from "axios";
import Cookies from "js-cookie";

export const GetAllSystemsApi = async (isApplied:any,setLoading:any,page:any,showWay:any,searchKeyWord:any,searchValue:any,startDate:any,endDate:any,no:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=DueDate&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);
  no && (queries+=`&no=${no}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/${isApplied}/${queries}`,
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



export const GetAllSystemsApiForReports = async (setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/reports/min`
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false)
  }
};