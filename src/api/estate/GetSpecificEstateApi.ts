import axios from "axios";
import Cookies from "js-cookie";

export const GetSpecificEstateApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/${id}`,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
