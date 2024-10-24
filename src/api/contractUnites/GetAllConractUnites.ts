import axios from "axios";
import Cookies from "js-cookie";

export const GetAllConractUnites = async (setLoading:any,id:any,page:any) => {


  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${id}/unites/all/${id}?page=${page}`,
      {
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false)
  }
};
