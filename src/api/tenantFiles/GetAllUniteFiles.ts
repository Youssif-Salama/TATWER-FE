import axios from "axios";
import Cookies from "js-cookie";

export const getAllUniteFiles = async (data: any): Promise< null> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}tenant-files?contractId=${data?.ContractId}&uniteId=${data?.UniteId}`, {
      headers: {
        token: Cookies.get("token")
      }
    });

    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching unite files:", error);
    // Optionally return null or throw an error depending on your needs
    return null;
  }
};
