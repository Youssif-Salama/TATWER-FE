import axios from "axios";
import Cookies from "js-cookie";
import { GetSpecificContractAutoSystemsCount } from "./GetSpecificContractAutoSystemsCount";

export const GetSpecifiContractApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/one/mine/${id}`,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    const Times:any=await GetSpecificContractAutoSystemsCount(id) || 0;
    response.data.data[0].AutoSystemCount=Times.data.data
    return response;
  } catch (error: any) {
    return error;
  }
};
