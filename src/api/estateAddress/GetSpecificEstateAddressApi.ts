import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const GetSpecificEstateAddressApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate-address/${id}`,
    );
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
