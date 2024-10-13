import { Button } from "@/componentsShadcn/ui/button";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { successToaster } from "@/utils/ReactToatify";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import {  setCatchEstateIdChange } from "@/store/slices/GlobalSlice";
import EstateForm from "./EstateForm";
import { CreateEstateTypes } from "@/types/CreateEstateTypes";
import { CreateEstateValidationSchema } from "@/validations/CreateEstateValidationSchema";
import { AddEstateApi } from "@/api/estate/AddEstateApi";
import { UpdateEstateApi } from "@/api/estate/UpdateEstateApi";
import { GetSpecificEstateApi } from "@/api/estate/GetSpecificEstateApi";
const CreateEstateCollection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const estateId = Cookies.get("estateId");

  const formik = useFormik<CreateEstateTypes>({
    initialValues: {
      EstateName: "",
      TitleDeedNumber: "",
      EstateSpace: "",
      PieceNumber: "",
      PlanNumber: "",
      Notes: "",
      Situation:"active"
    },
    validationSchema:   CreateEstateValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (estateId) {
        const result: any = await UpdateEstateApi(values,estateId);
        result && successToaster(result?.data?.message);
        result && setLoading(false);
        !result && setLoading(false);
      } else {
        const result: any = await AddEstateApi(values);
        result && successToaster(result?.data?.message);
        result && Cookies.set("estateId", result?.data?.data?._id);
        result && dispatch(setCatchEstateIdChange(Math.random()));
        result && setLoading(false);
        !result && setLoading(false);
      }
    },
  });

  const { resetForm } = useSelector(
    (state: RootState) => state.GlobalReducer
  );



  const getOneEstate = async (id: any) => {
    const result = await GetSpecificEstateApi(id);
    result?.data?.data.length>0 && formik.setValues(result?.data?.data[0]);
  };

  useEffect(()=>{
    if(estateId){
      getOneEstate(estateId)
    }
  },[estateId])

  useEffect(() => {
    formik.resetForm();
    document.querySelectorAll("input").forEach(element => {
      element.value = "";
    });
    document.querySelectorAll("textarea").forEach((element) => {
      element.value = "";
    })
    document.querySelectorAll("select").forEach((element) => {
      element.value = "";
    })
  }, [resetForm]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <EstateForm formik={formik} />

        <Button
        disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
        >
          {loading ? (
            <LoadingSpinner color="text-[#fff]" />
          ) : (
            estateId?"تعديل العقار":"حفظ العقار"
          )}
        </Button>
    </form>
  );
};

export default CreateEstateCollection;
