
import axios from "axios";
import Cookies from "js-cookie";

export const GetAllContractsForSpecificEstateApi = async (setLoading:any,page:any,id:any,type:any) => {
  let queries=`?page=${page}`;

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/${id}/reports/contracts/${type}${queries}`,
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
