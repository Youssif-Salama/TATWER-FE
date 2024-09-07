import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const DeleteMultipleContractSystemsApi = async (systemId: any, contractId: any,setLoading:any) => {
  try {
    setLoading(true);
    let response:any;
    systemId.forEach(async(item:any) => {
      response=await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
          }contract/${contractId}/systems/${item._id}`
        );
        response&&setLoading(false);
      });
    successToaster("تم الحذف بنجاح");
    return true;
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
