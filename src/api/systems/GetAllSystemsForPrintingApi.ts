import axios from "axios";
import Cookies from "js-cookie";

export const GetAllSystemsForPrintingApi = async (isApplied:any,page:any) => {
  let response:any;
    if(isApplied=="paid"){
      response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}contract-systems/print/true?page=${page}`,
          {
            headers:{
              token:Cookies.get("token")
            }
          }
      );
    }
    else if(isApplied=="unpaid"){
      response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}contract-systems/print/false?page=${page}`,
          {
            headers:{
              token:Cookies.get("token")
            }
          }
      );
    }
    else{
      response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}contract-systems/print/all?page=${page}`,
          {
            headers:{
              token:Cookies.get("token")
            }
          }
      );
    }

    return response;

};
