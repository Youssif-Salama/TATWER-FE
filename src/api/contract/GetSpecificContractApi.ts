import axios from "axios";

export const GetSpecifiContractApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}contract/one/${id}`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
