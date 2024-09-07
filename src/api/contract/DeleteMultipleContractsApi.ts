import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";

export const DeleteMultipleContractsApi = async (row: any,setLoading:any) => {
  try {
    setLoading(true);
    let response:any ;
    row.forEach(async(item:any) => {
      response=await axios.delete(
        `${import.meta.env.VITE_BASE_URL}contract/${item._id}`
      );
      response&&setLoading(false);
    });
    return true;
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
