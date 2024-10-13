import axios from "axios";
import Cookies from "js-cookie";

export const GetEstateFileApi = async (estateId: any) => {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/${estateId}/files`,
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
