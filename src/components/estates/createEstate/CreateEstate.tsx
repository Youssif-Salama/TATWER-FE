import { useEffect, useState } from "react";
import { Button } from "@/componentsShadcn/ui/button";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatchEstateIdChange,
  setMapLocation,
  setRefreshOnAddNewContractSystem,
  setResetForm,
} from "@/store/slices/GlobalSlice";
import SpecificContractSystems from "../specificContractSystems/SpecificContractSystems";
import CreateEstateCollection from "./createEstateParts/CreateEstateCollection";
import { DeleteEstateApi } from "@/api/estate/DeleteEstateApi";

const CreateEstate = () => {
  const [loading, setLoading] = useState(false);
  const [estateId, setEstateId] = useState<any>(null);
  const { catchEstateIdChange } = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setEstateId(Cookies.get("estateId"));
  }, [catchEstateIdChange]);

  return (
    <div>
      <div className="min-h-[70vh] mb-6">
        <div>
          <CreateEstateCollection />
        </div>
        <div
          className={`
                    ${estateId ? "" : "hidden"}
                    flex items-center justify-between w-full`}
        >
          <div>

          </div>
          <div className="flex gap-4">
            <Button
              onClick={async () => {
                const result = await DeleteEstateApi(estateId,setLoading);
                result && Cookies.remove("estateId");
                result && Cookies.remove("estateAddressId");
                result && dispatch(setCatchEstateIdChange(Math.random()));
                result && dispatch(setRefreshOnAddNewContractSystem(Math.random()));
              }}
              type="button"
              className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center flex-1"
            >
              {loading ? <LoadingSpinner color="text-[#fff]" /> : "الغاء العقار"}
            </Button>

            <Button
              onClick={() => {
                Cookies.remove("estateId");
                Cookies.remove("estateAddressId");
                dispatch(setCatchEstateIdChange(Math.random()));
                dispatch(setRefreshOnAddNewContractSystem(Math.random()));
                dispatch(setResetForm(Math.random()));
                dispatch(setMapLocation(null));
              }}
              type="button"
              className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center flex-1"
            >
              تسجيل عقار جديد
            </Button>
          </div>
        </div>
      </div>
      <SpecificContractSystems />
    </div>
  );
};

export default CreateEstate;
