import axios from "axios";
import Cookies from "js-cookie";

export const GetAllSystemsApi = async (isApplied:any,setLoading:any,page:any,showWay:any,searchKeyWord:any,searchValue:any,startDate:any,endDate:any,no:any,rowsPerPage?:any,currentContractForSystems?:any,contractIds?:any) => {
  let queries=`?page=${page}`;
  showWay && (queries+=`&sort=DueDate&dir=${showWay}`);
  searchKeyWord && (queries+=`&keyWord=${searchKeyWord}`);
  searchValue && (queries+=`&value=${searchValue}`);
  startDate && (queries+=`&startDate=${startDate}`);
  endDate && (queries+=`&endDate=${endDate}`);
  no && (queries+=`&no=${no}`);
  rowsPerPage && (queries+=`&limit=${rowsPerPage}`);
  currentContractForSystems && (queries+=`&currentContractSystemId=${currentContractForSystems}`)
  contractIds && (queries+=`&contractIds=${contractIds}`);


  if (searchKeyWord === "ContractId.Type") {
    let searchValueReplacement;

    // Partial match for "مستأجر" or "مؤجر"
    if (searchValue.includes("مستأجر")) {
      searchValueReplacement = "landlord";
    } else if (searchValue.includes("مؤجر")) {
      searchValueReplacement = "tenant";
    }

    // Replace the searchValue part of the query if a replacement was determined
    if (searchValueReplacement) {
      const regex = /(&keyWord=ContractId\.Type&value=)[^&]*/;
      queries = queries.replace(regex, `$1${searchValueReplacement}`);
    }
  }


  try {
   if(isApplied !=="stop")
   {
    setLoading(true);
    let situation="true";
    if( isApplied == "unpaid"){
      situation="false";
    }
    else if( isApplied == "paid"){
      situation="true";
    }
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/${situation}/${queries}`,
      {
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
   }
   else{
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/stop/false${queries}`,
      {
        headers: {
          token:Cookies.get("token")
        }
      }
    );
    response&&setLoading(false);
    return response;
   }
  } catch (error: any) {
    setLoading(false)
  }
};



export const GetAllSystemsApiForReports = async (setLoading:any,type:any) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract-systems/reports/min/${type}?sortKey=ReleaseDate&sortDir=asc`,
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