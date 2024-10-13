import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/componentsShadcn/ui/dialog";

import { IoClose } from "react-icons/io5";
import { useState } from "react";
import LoadingSpinner from "@/common/LoadingSpinner";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setRefrehPaymentWay } from "@/store/slices/GlobalSlice";
import InputCommon from "@/common/InputCommon";
import { useFormik } from "formik";
import { AddPaymentWayApi } from "@/api/paymentWay/AddPaymentWayApi";

interface TaxFormProps {
  Way: number;
  Name: string;
  Description: string;
}

const AddPaymentWayDialog = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<TaxFormProps>({
    initialValues: {
      Way: 1,
      Name: "",
      Description: "",
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
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="m-0 outline-none bg-gray-100 text-[#0077bc] py-2 px-4 border"
        >
           اضافه
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-sm mt-5 relative">
            <DialogClose className="text-lg absolute left-0 -top-7" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]"/>
              </button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <InputCommon
          type="number"
          required
          id="Way"
          name="Way"
          placeholder="ادخل القيمه  هنا"
          label="الطريقه"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.Way}
          error={null}
        />
      </div>
      <div className="w-full">
        <InputCommon
          type="text"
          required
          id="Name"
          name="Name"
          placeholder="ادخل القيمه  هنا"
          label="الاسم"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.Name}
          error={null}
        />
      </div>
      <div className="w-full">
        <InputCommon
          type="text"
          required
          id="Description"
          name="Description"
          placeholder="ادخل القيمه  هنا"
          label="الوصف"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.Description}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentWayDialog;
