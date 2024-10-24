import { errorToaster, successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const handSendEmailApi = async (data:any, setLoading: any) => {
  try{
    setLoading(true)
    const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/email/handSend`,data,
    {
      headers: {
        token: Cookies.get("token"),
      },
    }
  );

  if (response) {
    console.log(response);
    successToaster(response?.data?.message);
    setLoading(false);
  }
}
catch (error: any) {
  setLoading(false);
  if (error.response) {
    errorToaster("خطأ ف الارسال تأكد من ادخال بياناتك كالايميل وكلمة السر بشكل صحيح");
  } else if (error.request) {
    errorToaster("Network Error");
  } else {
    errorToaster("Error in setting up the request");
  }
}
};
