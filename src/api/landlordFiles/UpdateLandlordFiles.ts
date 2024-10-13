import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateLandlordFiles = async (data:any,id:any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}landlord-files/${id}`,
      data,
      { headers: { token: Cookies.get("token") } }
    );
    response && successToaster(response?.data?.message)
    return response;
  } catch (error: any) {
    if (error.response) {
      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};
