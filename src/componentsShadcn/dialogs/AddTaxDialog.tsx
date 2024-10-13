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
import { setRefrehTax } from "@/store/slices/GlobalSlice";
import InputCommon from "@/common/InputCommon";
import { useFormik } from "formik";
import { AddTaxApi } from "@/api/tax/AddTaxApi";

interface TaxFormProps {
  TaxValue: number;
  Name: string;
  Symbol: string;
}

const AddTaxDialog = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<TaxFormProps>({
    initialValues: {
      TaxValue: 1,
      Name: "",
      Symbol: "",
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
          id="Symbol"
          name="Symbol"
          placeholder="ادخل القيمه  هنا"
          label="الرمز"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // @ts-ignore
          value={formik.values.Symbol}
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

export default AddTaxDialog;
