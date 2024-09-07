import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const DeleteContractSystemApi = async (systemId: any, contractId: any,setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.delete(
      `${
        import.meta.env.VITE_BASE_URL
      }contract/${contractId}/systems/${systemId}`
    );
    response && successToaster(response?.data?.message);
    response&&setLoading(false);
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
