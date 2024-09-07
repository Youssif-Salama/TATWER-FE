import { AddTaxApi } from "@/api/tax/AddTaxApi";
import InputCommon from "@/common/InputCommon";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";

import { setRefrehTax } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface TaxFormProps {
  TaxValue: number;
}

const TaxForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<TaxFormProps>({
    initialValues: {
      TaxValue: 1,
    },
    onSubmit: async (values: TaxFormProps, { resetForm }) => {
      const result = await AddTaxApi(values, setLoading);
      if (result) {
        dispatch(setRefrehTax(Math.random()));
        resetForm();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <InputCommon
          type="number"
          required
          id="TaxValue"
          name="TaxValue"
          placeholder="ادخل القيمه  هنا"
          label="الضريبه"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.TaxValue}
          error={null}
        />
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button
          type="submit" // Changed type to submit for form submission
          className="text-white bg-[#0077bc] hover:text-white rounded-lg hover:bg-[#0078bdc7]"
        >
          {loading ? <LoadingSpinner color="text-white" /> : "اضافه"}
        </Button>
      </div>
    </form>
  );
};

export default TaxForm;
