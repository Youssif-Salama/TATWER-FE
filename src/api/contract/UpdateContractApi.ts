import { CreateContractCollectionTypes } from "@/types/CreateContractCollection.types";
import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateContractApi = async (data: CreateContractCollectionTypes,id:any,type:string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}contract/${id}/${type}`,
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
