import { CreateEstateTypes } from "@/types/CreateEstateTypes";
import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateEstateApi = async (data: CreateEstateTypes,id:any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}estate/${id}`,
      data,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
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
