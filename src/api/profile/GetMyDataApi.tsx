import axios from "axios";
import Cookies from "js-cookie";

export const GetMyDataApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}employee/me`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
};