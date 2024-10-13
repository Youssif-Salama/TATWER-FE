import {  errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";


export const EmployeeSignupApi = async (data:{
  Email: string;
  Fname: string;
  Lname: string;
  Password: string;
},setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}employee/signup`,
      data
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
