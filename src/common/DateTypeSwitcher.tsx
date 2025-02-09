import { useEffect, useState } from "react";

const DateTypeSwitcher = ({formik}:{formik:any}) => {
  const [dateType,setDateType]=useState("G");

  const handleSwitch=(type:"G" | "H")=>{
    type=="H" ?setDateType("H") :setDateType("G");
  }


  useEffect(()=>{
    formik.setFieldValue("DateType",dateType)
  },[dateType])

  return (
    <div className="bg-[#0077bc] shadow-lg p-1 flex items-center font-semibold gap-1 text-white max-sm:flex-1">
      {["G", "H"].map((type) => (
        <div
          key={type}
          className={`w-full text-center cursor-pointer p-1 ${
            dateType === type ? "text-[#0077bc] bg-white px-4" : "transition-all duration-300 transform ease-linear hover:ring-1 hover:ring-white px-2"
          }`}
          onClick={() => handleSwitch(type as "G" | "H")}
        >
          {type === "G" ? "م" : "ه"}
        </div>
      ))}
    </div>
  );
};

export default DateTypeSwitcher;
