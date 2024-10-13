import { Unit } from "@/types/createEstateUniteApi";
import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateUniteApi = async (data: Unit,id:any,setLoading:any) => {
  try {
    setLoading(true)
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}estate-unite/${id}`,
      data,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    response &&  setLoading(false);
    response && successToaster(response?.data?.message);
    return response;
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
