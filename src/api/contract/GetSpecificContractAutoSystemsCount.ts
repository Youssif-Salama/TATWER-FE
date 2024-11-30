// /:id/

import axios from "axios";
import Cookies from "js-cookie";

export const GetSpecificContractAutoSystemsCount = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/count/${id}/auto-systems`,
      {
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {
    // test
  }
};