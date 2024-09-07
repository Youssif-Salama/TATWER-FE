import { setGetContractType } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllContractsSwitcher = () => {
  const { getContractType } = useSelector((state: RootState) => state.GlobalReducer);
    const [type, setType] = useState<string>("tenant");
    const dispatch: AppDispatch = useDispatch();




    useEffect(() => {
        if (getContractType === "tenant") {
            setType("tenant");
        } else if (getContractType === "landlord") {
            setType("landlord");
        }
    }, [getContractType])

    return (
        <div className={`flex flex-col gap-4 `}>
            <div className="bg-[#0077bc]  shadow-lg p-1 flex items-center font-semibold gap-1 text-white">
                <div className={`w-full  text-center cursor-pointer p-1 ${type === "tenant" ? "text-[#0077bc] bg-white" : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"}`}
                    onClick={() => {
                        dispatch(setGetContractType("tenant"))
                    }}
                >مؤجر</div>
                <div className={`w-full  text-center cursor-pointer p-1 ${type === "landlord" ? "text-[#0077bc] bg-white" : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"}`}
                    onClick={() => {
                        dispatch(setGetContractType("landlord"))
                    }}
                >مستأجر</div>
            </div>
        </div>
    );
}

export default AllContractsSwitcher
