import { CreateContractCollectionTypes } from "@/types/CreateContractCollection.types";
import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const AddContractApi = async (data: CreateContractCollectionTypes) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract`,
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
