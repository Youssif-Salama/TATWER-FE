import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateEmployeePagesApi = async (data:any, setLoading:any, rows: any) => {
  try {
    setLoading(true);
    let response;
    rows.forEach(async(row:any) => {
      response=await axios.put(
        `${import.meta.env.VITE_BASE_URL}employee/pages/${row?._id}`,
        data,
        {
          headers: {
            token: Cookies.get("token"),
          }
        }
      );
      response &&  setLoading(false);
    });
    return true;
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
