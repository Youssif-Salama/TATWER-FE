import axios from "axios";
import Cookies from "js-cookie";

export const GetAllReportsApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}reports`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
};


export const GetAllEmployeeNoWithStatusApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}reports/employees`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
}

export const GetAllTasksNoWithStatusApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}reports/tasks`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
}