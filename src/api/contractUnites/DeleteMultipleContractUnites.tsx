import { errorToaster } from "@/utils/ReactToatify";
import axios from "axios";
import { DeleteLandLordFilesDependingOnContract } from "../landlordFiles/DeleteLandLordFilesDependingOnContract";
import { DeleteTenantFilesDependingOnContract } from "../tenantFiles/DeleteTenantFilesDependingOnContract";
import Cookies from "js-cookie";

export const DeleteMultipleContractUnites = async (row: any,setLoading:any,type:any) => {
  try {
    setLoading(true);
    let response:any ;
    row.forEach(async(item:any) => {
      response=await axios.delete(
        `${import.meta.env.VITE_BASE_URL}contract-unites/${item?._id}`,
        {headers:{
          token:Cookies.get("token")
        }}
      );
      response&&setLoading(false);
      response && type==="landlord"&& DeleteLandLordFilesDependingOnContract(item?.ContractId)
      response && type==="tenant"&& DeleteTenantFilesDependingOnContract(item?.ContractId)

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
