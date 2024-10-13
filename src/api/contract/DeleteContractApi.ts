import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteContractApi = async (id: string,setLoading:any,type:string) => {
  try {
    setLoading(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}contract/${id}/${type}`,
      {
        headers: {
        token: Cookies.get("token")
        }
      }
    );
    response && successToaster(response?.data?.message);
    response&&setLoading(false);
    return true;
  } catch (error: any) {
    setLoading(false)
    if (error.response) {
      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};
