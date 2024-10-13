import axios from "axios";
import Cookies from "js-cookie";

export const GetSystemsPaymentInfoApi = async (id:any) => {


  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/${id}/totalPaymentInfo`,
      {
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {
  }
};
