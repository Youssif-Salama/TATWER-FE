


import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const AddSystemMessageApi = async (
  data:any,
  setLoading:any,
  systemId: any
) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract-systems/message/${systemId}`,
      data
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
