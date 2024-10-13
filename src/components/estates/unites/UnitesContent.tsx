import Cookies from "js-cookie";
import UnitesForm from "./UnitesForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UnitesContent = () => {

  const [EstateId, setEstateId] = useState<string>("");
  const{catchEstateIdChange}=useSelector((state:RootState)=>state.GlobalReducer);
  useEffect(()=>{
    const temp:any = Cookies.get("estateId");
    setEstateId(temp);
  },[catchEstateIdChange])
  return (
    <div>
      {EstateId && (
        <>
          <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
          <div>
            <UnitesForm />
          </div>
        </>
      )}
    </div>
  );
};

export default UnitesContent;
