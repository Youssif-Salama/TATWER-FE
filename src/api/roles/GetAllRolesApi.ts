import axios from "axios";
import Cookies from "js-cookie";

export const GetAllRolesApi = async (page:any,setLoading:any,rowsPerPage?:any) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}role?page=${page}&limit=${rowsPerPage}`,{
        headers:{
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false);
  }
};