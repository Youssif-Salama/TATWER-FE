import CreateContractCollection from "./CreateContractParts/CreateContractCollection";
import { useEffect, useState } from "react";
import { Button } from "@/componentsShadcn/ui/button";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { DeleteContractApi } from "@/api/contract/DeleteContractApi";
import {
  setCatchContractIdChange,
  setMapLocation,
  setRefreshOnAddNewContractSystem,
  setResetForm,
} from "@/store/slices/GlobalSlice";
import SpecificContractSystems from "../specificContractSystems/SpecificContractSystems";
import { decodeToken } from "@/methods/GlobalMethods";
import NotAllowedLayer from "@/common/NotAllowedLayer";

const CreateContract = () => {
  const [loading, setLoading] = useState(false);
  const [contractId, setContractId] = useState<any>(null);
  const [contractType, setContractType] = useState<any>(null);
  const { catchContractIdChange ,contractType:catchContractType} = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setContractId(Cookies.get("contractId"));
    setContractType(Cookies.get("contractType"));
  }, [catchContractIdChange]);

  const token=Cookies.get("token");

  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    if (token) {
      const tokenData = decodeToken(token);
      setDecodedToken(tokenData);
    }
  },[token])

  return (
    <div>
      <div className="min-h-[70vh] mb-6">
        <div>
          {
            ( decodedToken?.Role=="super_admin" || decodedToken?.Pages["contracts"][`${catchContractType}s`].post ==true) ?
            <CreateContractCollection />:<NotAllowedLayer/>
          }
        </div>
        <div
          className={`
                    ${contractId ? "" : "hidden"}
                    flex items-center justify-between w-full`}
        >
          <div>

          </div>
          <div className="flex gap-4">
            <Button
              onClick={async () => {
                const result = await DeleteContractApi(contractId,setLoading,contractType);
                result && Cookies.remove("contractId");
                result && Cookies.remove("addressId");
                result && Cookies.remove("fileId");
                result && dispatch(setCatchContractIdChange(Math.random()));
                result && dispatch(setResetForm(Math.random()));
                result && dispatch(setRefreshOnAddNewContractSystem(Math.random()));
              }}
              type="button"
              className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center flex-1"
            >
              {loading ? <LoadingSpinner color="text-[#fff]" /> : "الغاء العقد"}
            </Button>

            <Button
              onClick={() => {
                Cookies.remove("contractId");
                Cookies.remove("addressId");
                 Cookies.remove("fileId");
                dispatch(setCatchContractIdChange(Math.random()));
                dispatch(setRefreshOnAddNewContractSystem(Math.random()));
                dispatch(setResetForm(Math.random()));
                dispatch(setMapLocation(null));
              }}
              type="button"
              className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center flex-1"
            >
              تسجيل عقد جديد
            </Button>
          </div>
        </div>
      </div>
      <SpecificContractSystems />
    </div>
  );
};

export default CreateContract;
