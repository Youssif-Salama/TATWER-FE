import axios from "axios";
import Cookies from "js-cookie";

export const GetEstateContracts = async (id:any,page:any,limit:any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}estate/getEstateContracts?page=${page}&limit=${limit}`,
      {
        estateId:id
      },
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
