import axios from "axios";

export const GetAllEstatesApi = async (setLoading:any,page:any,showWay:any,searchKeyWord:any,searchValue:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=updatedAt&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate${queries}`
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false)
  }
};
