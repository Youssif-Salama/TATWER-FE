import axios from "axios";
import Cookies from "js-cookie";

export const GetAllContractsApi = async (setLoading:any,contractsType:any,page:any,showWay:any,searchKeyWord:any,searchValue:any,startDate:any,endDate:any,displayOnlyNearToEndedContracts?:any,rowsPerPage?:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=ContractEndsDate&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);
  rowsPerPage && (queries+=`&limit=${rowsPerPage}`);
  displayOnlyNearToEndedContracts && (queries+=`&displayOnlyNearToEndedContracts=${displayOnlyNearToEndedContracts}`);
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractsType}/${contractsType}${queries}`,
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



export const GetAllContractsApiForUnite = async (page:any,contractsType:any,setLoading:any,searchKeyWord:any,searchValue:any,type:string,currentEstateId?:any) => {
  let queries=`?page=${page}`;
  searchKeyWord ? (queries+=`&keyWord=${searchKeyWord}`):(queries+=`&keyWord=Name`);
  searchValue && (queries+=`&value=${searchValue}`);
  currentEstateId && (queries+=`&currentEstateId=${currentEstateId}`);

  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractsType}/${type}${queries}`,
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




export const GetAllContractsPerEstateApi = async (setLoading:any,contractsType:any,page:any,showWay:any,searchValue:any,startDate:any,endDate:any,rowsPerPage?:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=updatedAt&dir=${showWay}`);
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);
  rowsPerPage && (queries+=`&limit=${rowsPerPage}`);

  try {
    setLoading(true);
    let result:any=[];
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/searchByEstateNameToGetContracts/${searchValue}/${contractsType}${queries}`,
      {
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    response && response?.data?.data?.map((obj:any)=>{
      if(obj?.ContractId){
        result.push(obj.ContractId)
      }
    })

    return {
      data:{
        data:result,
        meta:response?.data?.meta
      }
    };
  } catch (error: any) {
    setLoading(false)
  }
};
