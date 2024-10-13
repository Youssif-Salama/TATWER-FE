import axios from "axios";
import Cookies from "js-cookie";

export const GetOneEmployeeApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}employee/one/${id}`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
};