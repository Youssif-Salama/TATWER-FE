import { Button } from "@/componentsShadcn/ui/button";
import {  useState } from "react";
import ContractUnites from "./ContractUnites";


const ContractUnitesCollection = () => {
  const [showContractUnites, setShowContractUnites] = useState<boolean>(false);



  return (
    <div>
      <div className="flex items-center  justify-end">
      <Button
      onClick={() => {
        setShowContractUnites(!showContractUnites);
      }}
      className="my-6 bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center">
        {showContractUnites ? "اغلاق" : "ربط الوحدات"}
      </Button>
      </div>

      <div className={`${showContractUnites ? "" : "hidden"}`}>
      <div className="bg-[#0077bc] text-[#0077bc] p-1 mb-6">
        <div className="text-center p-1 bg-white">ربط الوحدات</div>
      </div>
        <ContractUnites/>
      </div>
    </div>
  );
};

export default ContractUnitesCollection;
