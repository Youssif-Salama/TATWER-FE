import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateEstateFileApi = async (setLoading:any,data: any,fileId:any) => {

  try {
    setLoading(true);
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}estate-files/${fileId}`,
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
