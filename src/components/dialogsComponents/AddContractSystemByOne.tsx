import { GetAllPaymentWaysApi } from "@/api/paymentWay/GetAllPaymentWaysApi";
import { AddContractSystemApi } from "@/api/systems/AddContractSystemApi";
import InputCommon from "@/common/InputCommon";
import InputDateCommon from "@/common/InputDateCommon";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";
import { DialogFooter } from "@/componentsShadcn/ui/dialog";
import { setRefreshOnAddNewContractSystem } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { UpdateContractSystemDialogProps } from "@/types/UpdateContractSystemTypes";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddContractSystemByOne = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const contractId = Cookies.get("contractId");
  const [takeDate, setTakeDate] = useState<boolean>(false);


  const [loading1,setLoading1]=useState(false);
  const [payments,setPayments]=useState([]);
  const getPaymentWays=async()=>{
    const result=await GetAllPaymentWaysApi(setLoading1);
    result && setPayments(result?.data?.data);
  }

  useEffect(()=>{
    getPaymentWays();
  },[])

  const formik = useFormik<UpdateContractSystemDialogProps>({
    initialValues: {
      RentValue: "",
      FixedPrice: "",
      CurrentPaymentWay: "",
      CurrentReleaseDate: "",
    },
    onSubmit: async (values: UpdateContractSystemDialogProps) => {
      const result = await AddContractSystemApi(values, setLoading, contractId);
      result && dispatch(setRefreshOnAddNewContractSystem(Math.random()));
    },
  });

  useEffect(() => {
    if (!takeDate) {
      formik.setFieldValue("CurrentReleaseDate", null);
    }
  }, [takeDate]);
  return (
    <DialogFooter>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center flex-wrap w-full gap-4 justify-between mb-5">
          <div className="flex items-center flex-wrap w-full gap-4 justify-between">
            <div className="w-[45%] max-md:w-[45%] max-sm:w-full">
              <InputCommon
                type="text"
                required={false}
                id="RentValue"
                name="RentValue"
                placeholder="ادخل قيمه الايجار هنا"
                label="قيمه الايجار"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // @ts-ignore
                value={formik.values.RentValue}
                error={null}
              />
            </div>

            <div className="w-[45%] max-md:w-[45%] max-sm:w-full">
              <InputCommon
                type="text"
                required={false}
                id="FixedPrice"
                name="FixedPrice"
                placeholder="ادخل القيمه الثابته هنا"
                label="  القيمه الثابته"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // @ts-ignore
                value={formik.values.FixedPrice}
                error={null}
              />
            </div>
          </div>

          <div className="flex items-center flex-wrap w-full gap-4 justify-between">
            <div className="flex items-center gap-3 w-full" dir="rtl">
              <div >
                <div className=" mb-1 h-[15px]" />
                <label
                  htmlFor="PaymentWay"
                  className="text-[#0077bc] text-[12px] text-sm w-[16%]"
                >
                  طريقه الدفع
                </label>
              </div>

              {loading1 ? (
                "حاري التحميل.."
              ) : (
                <div className="w-full">
                  {
                    <div className="text-red-500 text-[10px] mb-1 h-[15px]">
                      {formik.errors &&
                        formik.touched.CurrentPaymentWay &&
                        formik.errors.CurrentPaymentWay}
                    </div>
                  }

                  {/* @ts-ignore */}
                  <select
                    name="CurrentPaymentWay"
                    //@ts-ignore
                    id="CurrentPaymentWay"
                    dir="rtl"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.CurrentPaymentWay}
                    className="bg-[#fff] rounded-none w-full mx-auto placeholder:text-gray-400 text-[14px] px-2 py-[11px] border-2 border-slate-200"
                  >
                    <option>اختر طريقه الدفع</option>
                    {payments?.map((payment: any) => (
                      <option key={payment.id} value={payment.Way}>
                        {payment.Way}شهرا
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="text-[12px] opacity-75 w-full flex items-center gap-4">
            <div>هل تريد اضافه تاريح البدأ يدويا</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="takeDate"
                  id="takeDateTrue"
                  onChange={() => setTakeDate(true)}
                />
                <label htmlFor="takeDateTrue">نعم</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="takeDate"
                  id="takeDateFalse"
                  onChange={() => setTakeDate(false)}
                />
                <label htmlFor="takeDateFalse">لا</label>
              </div>
            </div>
          </div>

          {takeDate && (
            <InputDateCommon
              required={true}
              id="CurrentReleaseDate"
              name="CurrentReleaseDate"
              label="تاريخ البدء"
              placeholder="ادخل تاريخ البدء هنا"
              formik={formik}
              onBlur={formik.handleBlur}
              // @ts-ignore
              value={formik.values.CurrentReleaseDate}
              error={null}
            />
          )}
        </div>
        <Button
          type="submit"
          className="text-white bg-[#0077bc] rounded-lg hover:bg-[#0078bdc7] w-full"
        >
          {loading ? <LoadingSpinner color="text-white" /> : "اضافه"}
        </Button>
      </form>
    </DialogFooter>
  );
};

export default AddContractSystemByOne;
