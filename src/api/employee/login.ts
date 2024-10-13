import {  errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const EmployeeLoginApi = async (data:{
  Email: string;
  Password: string;
},setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}employee/login`,
      data
    );
    response &&  setLoading(false);
    response && successToaster(response?.data?.message);
    response && Cookies.set("token",response?.data?.token);
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
