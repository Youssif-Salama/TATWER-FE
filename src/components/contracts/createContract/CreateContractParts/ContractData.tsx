import { GetAllObjectApi } from "@/api/objects/GetAllObjectApi";
import InputCommon from "@/common/InputCommon";
import { useEffect, useState } from "react";

const ContractData = ({ formik }: { formik: any }) => {
   // @ts-ignore
  const [loading, setLoading] = useState(false);
   // @ts-ignore
  const [loading1, setLoading1] = useState(false);
  const [objects, setObjects] = useState([]);




  const getAllObject = async () => {
    const result = await GetAllObjectApi(setLoading1);
    result && setObjects(result?.data?.data);
  };

  useEffect(() => {
    getAllObject();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="ContractNumber"
            name="ContractNumber"
            placeholder="ادخل الرقم هنا"
            label="رقم العقد"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ContractNumber}
            error={
              formik.errors &&
              formik.touched.ContractNumber &&
              formik.errors.ContractNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="ContractCopy"
            name="ContractCopy"
            placeholder="ادخل نسخه العقد هنا"
            label="العقد نسخه"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ContractCopy}
            error={
              formik.errors &&
              formik.touched.ContractCopy &&
              formik.errors.ContractCopy
            }
          />
        </div>

        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <div className="flex items-center gap-3" dir="rtl">
            <div className="w-[13%]">
              <div className=" mb-1 h-[15px]" />
              <label
                htmlFor="RelyOn"
                className="text-[#0077bc] text-[12px] text-sm w-[16%]"
              >
                الكيان
              </label>
            </div>

            {loading ? (
              "حاري التحميل.."
            ) : (
              <div className="w-[84%]">
                {
                  <div className="text-red-500 text-[10px] mb-1 h-[15px]">
                    {formik.errors &&
                      formik.touched.RelyOn &&
                      formik.errors.RelyOn}
                  </div>
                }

                {/* @ts-ignore */}
                <select
                  name="RelyOn"
                  //@ts-ignore
                  id="RelyOn"
                  dir="rtl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.RelyOn}
                  className="bg-[#fff] rounded-none w-full mx-auto placeholder:text-gray-400 text-[14px] px-2 py-[11px] border-2 border-slate-200"
                >
                  <option>اختر الكيان</option>
                  {objects?.map((object: any) => (
                    <option key={object.id} value={object.Name}>
                      {object.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractData;
