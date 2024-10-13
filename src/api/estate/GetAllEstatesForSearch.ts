import axios from "axios";
import Cookies from "js-cookie";

export const GetAllEstatesForSearch = async (page:any,setLoading:any,searchKeyWord:any,searchValue:any) => {
  let queries=`?page=${page}`;
  searchKeyWord ? (queries+=`&keyWord=${searchKeyWord}`):(queries+=`&keyWord=Name`);
  searchValue && (queries+=`&value=${searchValue}`);


  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/reports/one/${queries}`,
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