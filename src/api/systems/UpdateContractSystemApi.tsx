import { UpdateContractSystemDialogProps } from "@/types/UpdateContractSystemTypes";
import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateContractSystemApi = async (
  data: UpdateContractSystemDialogProps,
  contractId: any,
  systemId: any,
  setLoading:any
) => {
  try {
    setLoading(true);
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/systems/${systemId}`,
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
