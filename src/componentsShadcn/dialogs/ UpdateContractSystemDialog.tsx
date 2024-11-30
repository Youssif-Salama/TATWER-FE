import { UpdateContractSystemApi } from "@/api/systems/UpdateContractSystemApi";
import InputCommon from "@/common/InputCommon";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentsShadcn/ui/dialog";
import { setRefreshOnAddNewContractSystem } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { SpecificContractSystemTypes } from "@/types/SpecificContractSystemTypes";
import { UpdateContractSystemDialogProps } from "@/types/UpdateContractSystemTypes";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";



const UpdateContractSystemDialog = ({
  row,
}: {
  row: SpecificContractSystemTypes;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch:AppDispatch=useDispatch();

  const formik = useFormik<UpdateContractSystemDialogProps>({
    // @ts-ignore
    initialValues: {
      RentValue: "",
      FixedPrice: "",
    },
    onSubmit: async(values: UpdateContractSystemDialogProps) => {
      const result=await UpdateContractSystemApi(values, row.ContractId,row._id, setLoading);
      result && dispatch(setRefreshOnAddNewContractSystem(Math.random()))
    },
  });


  useEffect(()=>{
    // @ts-ignore
    formik.setValues({RentValue:row.RentValue,FixedPrice:row.FixedPrice})
  },[row])
  return (
    <Dialog>
      <DialogTrigger asChild>
      <button className="bg-green-500 border-0 outline-0 rounded-md p-2 text-sm cursor-pointer text-white"
            ><FaEdit  className=" text-white" />
</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between opacity-75 mt-5 text-sm relative">
          <DialogClose className="text-lg absolute left-0 -top-7" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
              <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
            <div className="flex gap-2 py-4">
              <span>رقم الدفعه</span>
              <span>{row.SystemNumber}</span>
            </div>
            <div>
              <span>قيمه الايجار</span>
              <span>{row.RentValue}</span>
            </div>
            <div>
              <span>القيمه الثابته</span>
              <span>{row.FixedPrice}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center flex-wrap w-full gap-2 justify-between mb-5">
              <InputCommon
                type="number"
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
              <InputCommon
                type="number"
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
            <Button
              type="submit"
              className="text-white bg-[#0077bc] rounded-lg hover:bg-[#0078bdc7] w-full"
            >
              {loading ? <LoadingSpinner color="text-white" /> : "تعديل"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContractSystemDialog;
