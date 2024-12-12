import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const AddNewOrderTypeApi = async (data:any,setLoading?:any) => {
  try {
    setLoading && setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}orderTypes`,data,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    setLoading && setLoading(false);
    response && successToaster( response?.data?.message);
    return response;
  } catch (error: any) {
    setLoading && setLoading(false);
    error && errorToaster(error.response.data.message || "Server Error");
  }
};