import axios from "axios";
import Cookies from "js-cookie";

export const GetAllEstatesApi = async (setLoading:any,page:any,showWay:any,searchKeyWord:any,searchValue:any,rowsPerPage?:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=updatedAt&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);
  rowsPerPage && (queries+=`&limit=${rowsPerPage}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate${queries}`,
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
