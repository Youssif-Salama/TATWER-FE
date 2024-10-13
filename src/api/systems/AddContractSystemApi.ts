import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const AddContractSystemApi = async (
  data:any,
  setLoading:any,
  contractId: any
) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value =="" || value == null) {
      delete data[key];
    }
  })
  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/systems`,
      data,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    response && successToaster(response?.data?.message);
    response&&setLoading(false);
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
