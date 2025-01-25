import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const DeleteSomeSystemsApi = async (
  systemIds: string[] | number[],
  contractId: string | undefined,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}contract-systems/delete-some/${contractId}`,
      {
        headers: {
          token: Cookies.get("token") || "",
        },
        data: {
          SystemIds: systemIds,
        },
      }
    );

    if (response?.data) {
      successToaster("تم الحذف بنجاح");
      return true;
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      (error?.request ? "Network Error" : "Error in setting up the request");
    errorToaster(errorMessage);
  } finally {
    setLoading(false);
  }
};
