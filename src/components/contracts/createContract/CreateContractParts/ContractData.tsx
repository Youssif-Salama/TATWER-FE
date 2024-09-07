import InputCommon from "@/common/InputCommon";
import InputDateCommon from "@/common/InputDateCommon";


const ContractData = ({ formik }: { formik: any }) => {
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
          <InputCommon
            type="text"
            required
            id="RelyOn"
            name="RelyOn"
            placeholder=" ادخل المسجل عليه هنا"
            label="مسجل علي"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.RelyOn}
            error={
              formik.errors && formik.touched.RelyOn && formik.errors.RelyOn
            }
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-[49px] max-md:gap-4">
      <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommon
            required={true}
            id="ContractReleaseDate"
            name="ContractReleaseDate"
            label="تاريخ البدء"
            placeholder="ادخل تاريخ البدء هنا"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.ContractReleaseDate}
            error={formik.errors && formik.touched.ContractReleaseDate && formik.errors.ContractReleaseDate}
          />
        </div>
        <div className="w-[34.6%] max-md:w-[45%] max-sm:w-full">
          <div className="flex items-center gap-3" dir="rtl">
            <div className="w-[13%]">
              <div className=" mb-1 h-[15px]" />
              <label
                htmlFor="PaymentWay"
                className="text-[#0077bc] text-[12px] text-sm w-[16%]"
              >
                طريقه الدفع
              </label>
            </div>

            <div className="w-[84%]">
              {
                <div className="text-red-500 text-[10px] mb-1 h-[15px]">
                  {formik.errors &&
                    formik.touched.PaymentWay &&
                    formik.errors.PaymentWay}
                </div>
              }

              {/* @ts-ignore */}
              <select
                name="PaymentWay"
                //@ts-ignore
                id="PaymentWay"
                dir="rtl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.PaymentWay}
                className="bg-[#fff] rounded-none w-full mx-auto placeholder:text-gray-400 text-[14px] px-2 py-[11px] border-2 border-slate-200"
              >

                    <option>اختر طريقه الدفع</option>
                    <option value="1">شهري</option>
                    <option value="3">ربع سنوي</option>
                    <option value="6">نصف سنوي</option>
                    <option value="12">سنوي</option>

              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractData;
