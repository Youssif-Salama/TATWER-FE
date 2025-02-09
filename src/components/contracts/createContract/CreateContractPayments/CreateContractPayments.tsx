import { GetAllPaymentWaysApi } from "@/api/paymentWay/GetAllPaymentWaysApi";
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


    const [payments, setPayments] = useState([]);
    const getPaymentWays = async () => {
      const result = await GetAllPaymentWaysApi(setLoading);
      result && setPayments(result?.data?.data);
    };

    useEffect(() => {
      getPaymentWays();
    }, []);

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
                <div className="flex items-center flex-wrap w-full gap-[45px] max-md:gap-4">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
        <InputCommon type="text" required id="ContractReleaseDate" name="ContractReleaseDate" placeholder="ادخل تاريخ البدء" label=" تاريخ البدأ " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ContractReleaseDate} error={formik.errors && formik.touched.ContractReleaseDate && formik.errors.ContractReleaseDate} />
        </div>

        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
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

            {loading ? (
              "حاري التحميل.."
            ) : (
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
                  {payments?.map((payment: any) => (
                    <option key={payment.id} value={payment.Way}>
                      {payment.Way}شهرا | {payment.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
                {
                    // @ts-ignore
                    hasTax &&
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
                              {tax.TaxValue} | {tax.Name}
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
