import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteEstateApi = async (id: string,setLoading:any) => {
  try {
    setLoading(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}estate/${id}`
    ,
    {
      headers: {
      token: Cookies.get("token")
      }
    }
    );
    response && successToaster(response?.data?.message);
    response&&setLoading(false);
    return true;
  } catch (error: any) {
    setLoading(false)
    if (error.response) {
      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};



export const DeleteMultipleEstatesApi = async (row: any,setLoading:any) => {
  try {
    setLoading(true);
    let response:any ;
    row.forEach(async(item:any) => {
      response=await axios.delete(
        `${import.meta.env.VITE_BASE_URL}estate/${item._id}`,
        {headers:{
          token:Cookies.get("token")
        }}
      );
      response&&setLoading(false);
    });
    return true;
  } catch (error: any) {
    setLoading(false)
    if (error.response) {
      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};
