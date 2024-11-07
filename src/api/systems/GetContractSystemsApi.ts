import axios from "axios";
import Cookies from "js-cookie";

export const GetContractSystemsApi = async (contractId: string,page:number,limit:number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/systems/mine?page=${page}&limit=${limit}&sort=ReleaseDate&dir=asc`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    return response;
  } catch (error: any) {

  }
};
