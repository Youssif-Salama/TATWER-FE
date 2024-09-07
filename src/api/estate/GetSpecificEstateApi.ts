import axios from "axios";

export const GetSpecificEstateApi = async (id:any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}estate/${id}`
    );
    return response;
  } catch (error: any) {
    return error;
  }
};
