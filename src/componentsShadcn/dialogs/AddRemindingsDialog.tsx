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
import { useFormik } from "formik";
import { setRefreshRemindings } from "@/store/slices/GlobalSlice";
import { AddRemindingsApi } from "@/api/remindings/AddRemindingsApi";

interface TaxFormProps {
  RemindingTimeLine: string;
  RemindingMessage: string;
  RemindingHead: string;
  RemindingTail: string;
}

const AddRemindingsDialog = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<TaxFormProps>({
    initialValues: {
      RemindingTimeLine: "",
      RemindingHead:"",
      RemindingTail:"",
      RemindingMessage:"",
    },
    onSubmit: async (values: TaxFormProps, { resetForm }) => {
      const result = await AddRemindingsApi(values, setLoading);
      if (result) {
        dispatch(setRefreshRemindings(Math.random()));
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

      <div className="flex flex-col gap-2 text-[12px]">
        <label htmlFor="RemindingTimeLine" className=" text-[#0077bc]">توقيت التذكير</label>
        <select name="RemindingTimeLine" id="RemindingTimeLine" className="p-2 bg-white border-2"
          onChange={formik.handleChange}
          value={formik.values.RemindingTimeLine}
          onBlur={formik.handleBlur}
        >
          <option value="">اختر</option>
          <option value="30">تيقي عليها 30 يوم او اكثر</option>
          <option value="15">تيقي عليها 14 يوم</option>
          <option value="7">تبقي عليها 7 ايام</option>
          <option value="-7">مر عليها 7 ايام</option>
          <option value="-15">مر عليها 14 يوم</option>
          <option value="-30">مر عليها 30 يوم او اكثر</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 text-[12px]">
        <label htmlFor="RemindingHead" className=" text-[#0077bc]">المقدمه</label>
        <textarea className="border-2" name="RemindingHead" id="RemindingHead"
          onChange={formik.handleChange}
          value={formik.values.RemindingHead}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex flex-col gap-2 text-[12px]">
        <label htmlFor="RemindingMessage" className=" text-[#0077bc]">الرساله</label>
        <textarea className="border-2" name="RemindingMessage" id="RemindingMessage"
          onChange={formik.handleChange}
          value={formik.values.RemindingMessage}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex flex-col gap-2 text-[12px]">
        <label htmlFor="RemindingTail" className=" text-[#0077bc]">الخاتمه</label>
        <textarea className="border-2" name="RemindingTail" id="RemindingTail"
          onChange={formik.handleChange}
          value={formik.values.RemindingTail}
          onBlur={formik.handleBlur}
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

export default AddRemindingsDialog;
