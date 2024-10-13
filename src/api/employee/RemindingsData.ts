import axios from "axios";
import Cookies from "js-cookie";

export const GetEmployeeRemindingsInfoApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}employee/getRemindingsInfo`,{
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {
  }
};

export const AddEmployeeRemindingsInfoApi = async (data:any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}employee/addRemindingsInfo`,data,{
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {
  }
};
