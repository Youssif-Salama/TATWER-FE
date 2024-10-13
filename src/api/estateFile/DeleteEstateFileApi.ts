import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";


export const DeleteEstateFileApi = async (setLoading:any,estateId:any) => {

  try {
    setLoading(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}estate/${estateId}/files` ,
      {
        headers: {
          token: Cookies.get("token"),
        },
      });
    response &&  setLoading(false);
    response && successToaster(response?.data?.message);
    response&& Cookies.set("estateFileId",response?.data?.FileId)
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
