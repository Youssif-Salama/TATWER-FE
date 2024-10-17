import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const AddContractUnitesApi = async (data: any, setLoading: any) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract-unites`,
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
    setLoading(false);
    if (error.response) {

      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};


export const hasContract = async (type:string) => {
  try {
    const estateId=Cookies.get("estateId")
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/attach/${estateId}/${type}`,
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
