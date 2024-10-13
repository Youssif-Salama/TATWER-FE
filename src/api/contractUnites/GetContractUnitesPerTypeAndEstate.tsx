import axios from "axios";
import Cookies from "js-cookie";

export const GetContractUnitesPerTypeAndEstate = async (setLoading:any,page:any,type:any,estateId:any) => {
  let queries=`?page=${page}&sort=createdAt&dir=asc`;


  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/${estateId}/contract-unites/type/${type}${queries}`,
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
