import axios from "axios";

export const GetAllSystemsApi = async (isApplied:any,setLoading:any,page:any,showWay:any,searchKeyWord:any,searchValue:any,startDate:any,endDate:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=DueDate&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/${isApplied}/${queries}`
    );
    response&&setLoading(false);
    return response;
  } catch (error: any) {
    setLoading(false)
  }
};
