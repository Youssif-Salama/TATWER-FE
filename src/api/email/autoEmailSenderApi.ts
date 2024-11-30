import { successToaster } from "@/utils/ReactToatify";
import axios from "axios";
import Cookies from "js-cookie";

export const autoEmailSenderApi = async () => {
  const sendAutoEmail = localStorage.getItem("sendAutoEmail");

  if (!sendAutoEmail) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/email/send`, {
        headers: {
          token: Cookies.get("token")
        }
      });

      if (response) {
        localStorage.setItem("sendAutoEmail", "true");
        successToaster(response?.data?.message);
      }
    } catch (error) {
      console.error("Error sending auto email:", error);
    }
  }
};
