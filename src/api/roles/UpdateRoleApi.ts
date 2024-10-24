import { successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateRoleApi = async (id:any,data:any,setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}role/${id}`,data,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    response && setLoading(false);
    response && successToaster(response?.data?.message);
    return response;
  } catch (error: any) {
    setLoading(false);
  }
};