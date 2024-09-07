import axios from "axios";

export const GetContractFileApi = async (contractId: any) => {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/${contractId}/files`
    );
    return response;
  } catch (error: any) {
  }
};
