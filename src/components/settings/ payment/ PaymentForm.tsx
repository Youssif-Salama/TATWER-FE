import { AddPaymentWayApi } from "@/api/paymentWay/AddPaymentWayApi";
import InputCommon from "@/common/InputCommon";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";

import { setRefrehPaymentWay } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface TaxFormProps {
  Way: number;
}


const  PaymentForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<TaxFormProps>({
    initialValues: {
      Way: 1,
    },
    onSubmit: async (values: TaxFormProps, { resetForm }) => {
      const result = await AddPaymentWayApi(values, setLoading);
      if (result) {
        dispatch(setRefrehPaymentWay(Math.random()));
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
          id="Way"
          name="Way"
          placeholder="ادخل القيمه هنا"
          label="طريقه الدفع"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.Way}
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

export default  PaymentForm;
