import { UpdateContractPartTwoApi } from "@/api/contract/updateContractParts/UpdateContractPartTwoApi";
import InputCommon from "@/common/InputCommon";
import InputDateCommon from "@/common/InputDateCommon";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ContractAgent = ({ formik }: { formik: any }) => {
  const [values, setValues] = useState({});
  const updateContractPartTwo=async(data:any)=>{
     await UpdateContractPartTwoApi(data);
  };
  useEffect(() => {
    setValues({
      Agent: formik.values.Agent,
      IdNumber: formik.values.IdNumber,
      MobileNumber: formik.values.MobileNumber,
      RepresentationDocument: formik.values.RepresentationDocument,
      DocumentDate: formik.values.DocumentDate,
      DocumentNumber: formik.values.DocumentNumber,
    });
  }, [formik]);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="Agent"
            name="Agent"
            placeholder="ادخل الاسم هنا"
            label="الممثل"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Agent}
            error={formik.errors && formik.touched.Agent && formik.errors.Agent}
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="IdNumber"
            name="IdNumber"
            placeholder="ادخل رقم الهويه هنا"
            label="رقم الهويه "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.IdNumber}
            error={
              formik.errors && formik.touched.IdNumber && formik.errors.IdNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required
            id="MobileNumber"
            name="MobileNumber"
            placeholder="ادخل رقم الجوال هنا"
            label="رقم الجوال  "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.MobileNumber}
            error={
              formik.errors &&
              formik.touched.MobileNumber &&
              formik.errors.MobileNumber
            }
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="RepresentationDocument"
            name="RepresentationDocument"
            placeholder="ادخل مستند الممثل هنا"
            label="مستند الممثل"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.RepresentationDocument}
            error={
              formik.errors &&
              formik.touched.RepresentationDocument &&
              formik.errors.RepresentationDocument
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="DocumentNumber"
            name="DocumentNumber"
            placeholder="ادخل رقم المستند  هنا"
            label=" رقم المستند"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.DocumentNumber}
            error={
              formik.errors &&
              formik.touched.DocumentNumber &&
              formik.errors.DocumentNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommon
            required={true}
            id="DocumentDate"
            name="DocumentDate"
            label="تاريخ المستند"
            placeholder="تاريخ المستند"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.DocumentDate}
            error={formik.errors && formik.touched.DocumentDate && formik.errors.DocumentDate}
          />
        </div>
      </div>
      {
        Cookies.get("contractId") &&
        <div className="w-full mt-4 bg-[#0077bc] text-center text-white text-sm p-2 cursor-pointer
      hover:bg-[#0077bcc4]"
      onClick={()=>{
        updateContractPartTwo(values);
      }}
      >
        تعديل هذا الجزء
      </div>}
    </div>
  );
};

export default ContractAgent;
