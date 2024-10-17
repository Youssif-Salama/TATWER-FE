import { GetAllTaxApi } from "@/api/tax/GetAllTaxApi";
import InputCommon from "@/common/InputCommon";
import { useEffect, useState } from "react";




const CreateContractPayments = ({formik,hasTax}:{formik:any,hasTax:boolean}) => {
    const [taxes, setTaxes] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllTaxes = async () => {
      const result = await GetAllTaxApi(setLoading);
      result && setTaxes(result?.data?.data);
    }

    useEffect(() => {
        getAllTaxes();
    }, [hasTax]);

    return (
        <div className="flex items-center flex-wrap w-full gap-4 justify-between">
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="text" required id="Price" name="Price" placeholder="ادخل المبلغ هنا" label="مبلغ الدفع" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Price} error={formik.errors && formik.touched.Price && formik.errors.Price} />
                </div>
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="text" required id="FixedPrice" name="FixedPrice" placeholder="ادخل المبلغ هنا" label="المبالغ الثابته " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.FixedPrice} error={formik.errors && formik.touched.FixedPrice && formik.errors.FixedPrice} />
                </div>
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="number" required id="Times" name="Times" placeholder="ادخل التكرار هنا" label=" التكرار " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Times} error={formik.errors && formik.touched.Times && formik.errors.Times} />
                </div>
                {
                    // @ts-ignore
                    hasTax=="true" &&
                   (         <div className="flex items-center gap-3" dir="rtl">
                    <div className="w-[80%]">
                      <div className=" mb-1 h-[15px]" />
                      <label
                        htmlFor="TaxValue"
                        className="text-[#0077bc] text-[12px] text-sm w-[50%]"
                      >
                        الضريبه
                      </label>
                    </div>

                    {loading ? (
                      "حاري التحميل.."
                    ) : (
                      <div className="w-full">
                        {
                          <div className="text-red-500 text-[10px] mb-1 h-[15px]">
                            {formik.errors &&
                              formik.touched.TaxValue &&
                              formik.errors.TaxValue}
                          </div>
                        }

                        {/* @ts-ignore */}
                        <select
                          name="TaxValue"
                          //@ts-ignore
                          id="TaxValue"
                          dir="rtl"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.TaxValue}
                          className="bg-[#fff] w-[235px] rounded-none mx-auto placeholder:text-gray-400 text-[14px] px-2 py-[11px] border-2 border-slate-200"
                        >
                          <option>اختر الضريبه</option>
                          {taxes?.map((tax: any) => (
                            <option key={tax._id} value={tax.TaxValue}>
                              {tax.TaxValue}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>)
                }
        </div >
    );
}

export default CreateContractPayments;
