import axios from "axios";
import Cookies from "js-cookie";

export const GetContractFileApi = async (contractId: any) => {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/files`,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    return response;
  } catch (error: any) {
  }
};
