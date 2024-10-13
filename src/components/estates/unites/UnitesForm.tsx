import { AddUnitesApi } from "@/api/unites/AddUnitesApi";
import InputAdder from "@/common/InputAdder";
import InputCommon from "@/common/InputCommon";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";
import { setRefrehEstateUnites, setResetUniteAddons } from "@/store/slices/GlobalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Unit } from "@/types/createEstateUniteApi";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UnitesForm = () => {

  const[loading,setLoading]=useState<boolean>(false);
  const dispatch:AppDispatch=useDispatch();
  const {uniteAddonsLength}=useSelector((state:RootState)=> state.GlobalReducer);

  const addUnite=async(data:Unit,formik:any)=>{
    const result = await AddUnitesApi(data,setLoading);
    result && dispatch(setRefrehEstateUnites(Math.random()));
    result && dispatch(setResetUniteAddons(Math.random()));
    result && formik.resetForm();
    result && formik.setFieldValue("EstateId", Cookies.get("estateId"));
  }


  const formik = useFormik<Unit>({
    initialValues: {
      UniteName: "",
      UnitSpace: "",
      ElecMeters: "",
      WaterMeters: "",
      TelMeters: "",
      GasMeters: "",
      EstateId: "",
    },

    onSubmit: (values) => {
      addUnite(values,formik)
    },
  });

  useEffect(() => {
    const temp: any = Cookies.get("estateId");
    formik.setFieldValue("EstateId", temp);
  }, []);





  return (
    <div dir="rtl">
      <p className="bg-[#0077bc] font-semibold p-1 text-center">
        <div className="bg-white p-1 text-[#0077bc]">الوحدات</div>
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputCommon
            type="text"
            required
            id="UniteName"
            name="UniteName"
            placeholder="ادخل الوحده"
            label="اسم الوحده"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // @ts-ignore
            value={formik.values.UniteName}
            error={
              formik.errors &&
              formik.touched.UniteName &&
              formik.errors.UniteName
            }
          />
          <InputCommon
            type="text"
            required
            id="UnitSpace"
            name="UnitSpace"
            placeholder="ادخل المساحه"
            label="المساحه"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // @ts-ignore
            value={formik.values.UnitSpace}
            error={
              formik.errors &&
              formik.touched.UnitSpace &&
              formik.errors.UnitSpace
            }
          />
        </div>
        <div>
          <div>
            <InputAdder
              formik={formik}
              placeholder="ادخل رقم عداد الكهرباء"
              name="ElecMeters"
            />
          </div>
          <div>
            <InputAdder
              formik={formik}
              placeholder="ادخل رقم عداد الماء"
              name="WaterMeters"
            />
          </div>
          <div>
            <InputAdder
              formik={formik}
              placeholder="ادخل رقم عداد الهاتف"
              name="TelMeters"
            />
          </div>
          <div>
            <InputAdder
              formik={formik}
              placeholder="ادخل رقم عداد الغاز"
              name="GasMeters"
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-6">
          <Button
          type="submit"
          disabled={uniteAddonsLength==0}
          className="rounded-none bg-[#0077bc] hover:bg-[#0077bccd]">
            {
              loading ? <LoadingSpinner color="text-white" /> : "اضافه وحده"
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UnitesForm;
