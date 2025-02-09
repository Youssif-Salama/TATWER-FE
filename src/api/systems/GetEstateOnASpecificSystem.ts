import axios from "axios";
import Cookies from "js-cookie";

export const GetEstateOnASpecificSystem = async (id:any,page:any,limit:any) => {


  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}contract-systems/findCurrentSystemEstate?page=${page}&limit=${limit}`,
      {
        contractId:id || id?._id
      },
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
