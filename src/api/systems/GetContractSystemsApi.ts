import axios from "axios";

export const GetContractSystemsApi = async (contractId: string,page:number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/systems?page=${page}`
    );
    return response;
  } catch (error: any) {

  }
};
