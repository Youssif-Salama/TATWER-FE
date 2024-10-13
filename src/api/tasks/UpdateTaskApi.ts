import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateTaskApi = async (data: any, id: any, setLoading?: (loading: boolean) => void) => {
  try {
    // Set loading state to true if setLoading is provided
    if (setLoading) {
      setLoading(true);
    }

    const response: any = await axios.put(`${import.meta.env.VITE_BASE_URL}task/${id}`, data, {
      headers: {
        token: Cookies.get("token"),
      }
    });

    // Set loading state to false if setLoading is provided
    if (setLoading) {
      setLoading(false);
    }

    // Show success message
    successToaster(response?.data?.message);
    return response;
  } catch (error: any) {
    // Set loading state to false if setLoading is provided
    if (setLoading) {
      setLoading(false);
    }

    // Show error message
    errorToaster(error.response?.data?.message || "Server Error");

    // Optional: re-throw error to handle it in the caller
    throw error;
  }
};
