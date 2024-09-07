import { setContractType } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ContractTypeSwitch = () => {
    const { contractType } = useSelector((state: RootState) => state.GlobalReducer);
    const [type, setType] = useState<string>("tenant");
    const dispatch: AppDispatch = useDispatch();


    const location = useLocation();
    const pathname = location.pathname;
    const [hide, setHide] = useState<boolean>(false);

    useEffect(() => {
        if (pathname.includes("/files") || pathname.includes("/address")) {
            setHide(true);
        }

        return ()=>{
            setHide(false);
        }
    }, [pathname])


    useEffect(() => {
        if (contractType === "tenant") {
            setType("tenant");
        } else if (contractType === "landlord") {
            setType("landlord");
        }
    }, [contractType])

    return (
        <div className={`flex flex-col gap-4 ${hide && "hidden"}`}>
            <div className="bg-[#0077bc]  shadow-lg p-1 flex items-center font-semibold gap-1 text-white">
                <div className={`w-full  text-center cursor-pointer p-1 ${type === "tenant" ? "text-[#0077bc] bg-white" : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"}`}
                    onClick={() => {
                        dispatch(setContractType("tenant"))
                    }}
                >مؤجر</div>
                <div className={`w-full  text-center cursor-pointer p-1 ${type === "landlord" ? "text-[#0077bc] bg-white" : " transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white"}`}
                    onClick={() => {
                        dispatch(setContractType("landlord"))
                    }}
                >مستأجر</div>
            </div>
        </div>
    );
}

export default ContractTypeSwitch;
