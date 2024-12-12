import axios from "axios";
import Cookies from "js-cookie";

export const GetAllOrderTypes = async (setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/orderTypes?page=${1}&limit=${300}`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false);
  }
};