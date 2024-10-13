

import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const StopContractApi = async (id:any,data:any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract/stop-contract/${id}`,
      data,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    response && successToaster(response?.data?.message);
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
