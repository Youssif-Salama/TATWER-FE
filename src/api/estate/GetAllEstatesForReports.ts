import axios from "axios";
import Cookies from "js-cookie";

export const GetAllEstatesForReportsWithAddress = async (setLoading:any,page:any,situation:any,data:any) => {

  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}estate/reports/${situation}/?page=${page}&limit=30`,
      data,{
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





export const GetAllEstatesForReportsWithRelyOn = async (setLoading:any,page:any,situation:any,relyOn:any) => {

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/reports/${situation}/${relyOn}/?page=${page}&limit=30`,
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
