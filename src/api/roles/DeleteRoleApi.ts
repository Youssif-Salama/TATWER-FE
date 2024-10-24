import { successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteRoleApi = async (id:any) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}role/${id}`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    response && successToaster(response?.data?.message);
    return response;
  } catch (error: any) {

  }
};