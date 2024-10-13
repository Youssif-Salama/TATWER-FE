import axios from "axios";
import Cookies from "js-cookie";

export const GetAllEmployeesApi = async (setLoading:any,page:any,limit:any,showWay:any,searchKeyWord:any,searchValue:any) => {
  let queries=`?page=${page}`;
  limit && (queries+=`&limit=${limit}`);
  showWay && (queries+=`&sort=updatedAt&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}employee${queries}`,{
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
