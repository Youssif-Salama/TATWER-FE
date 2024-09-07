import { CreateEstateTypes } from "@/types/CreateEstateTypes";
import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const AddEstateApi = async (data: CreateEstateTypes) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}estate`,
      data
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
