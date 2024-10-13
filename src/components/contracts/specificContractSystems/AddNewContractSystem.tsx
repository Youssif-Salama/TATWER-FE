import AddContractSystemDialog from "@/componentsShadcn/dialogs/AddContractSystemDialog"
import { decodeToken } from "@/methods/GlobalMethods";
import { checkAuth } from "@/methods/PageConditions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AddNewContractSystem = () => {
  const token=Cookies.get("token");
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    token && setDecodedToken(decodeToken(token));
  }, [token]);



  return (
    <div>
      <div className="w-full flex items-end justify-between">
        <div className="text-[#0077bc]">
          الدفعات
        </div>
        <div>
          {
            checkAuth(decodedToken,"post",["systems","system"]) &&
          <AddContractSystemDialog/>
          }
        </div>
      </div>
    </div>
  )
}

export default AddNewContractSystem
