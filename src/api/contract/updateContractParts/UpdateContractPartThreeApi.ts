import { CreateContractCollectionTypes } from "@/types/CreateContractCollection.types";
import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdateContractPartThreeApi = async (data: CreateContractCollectionTypes) => {
  try {
    const id=Cookies.get("contractId")
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}contract/update/${id}/partThree`,
      data,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    response && successToaster(response?.data?.message)
    return response;
  } catch (error: any) {
    if (error.response) {
      errorToaster(error.response.data.message || "Server Error");
    } else if (error.request) {
      errorToaster("Network Error");
    } else {
      errorToaster("Error in setting up the request");
    }
  }
};
