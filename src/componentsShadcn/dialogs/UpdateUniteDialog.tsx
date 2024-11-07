import {  useState } from 'react';
import { Button } from '../ui/button';
import LoadingSpinner from '@/common/LoadingSpinner';
import InputAdder from '@/common/InputAdder';
import InputCommon from '@/common/InputCommon';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import { Unit } from '@/types/createEstateUniteApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setRefrehEstateUnites, setResetUniteAddons } from '@/store/slices/GlobalSlice';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/componentsShadcn/ui/dialog';
import { FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { UpdateUniteApi } from '@/api/unites/UpdateUniteApi';

const UpdateUniteDialog = ({ row }: { row: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  // @ts-ignore
  const { uniteAddonsLength } = useSelector((state: RootState) => state.GlobalReducer);
  const { _id } = row;

  const updateUniteValue = async (data: Unit, formik: any) => {
    const result = await UpdateUniteApi(data, _id,setLoading);
    if (result) {
      dispatch(setRefrehEstateUnites(Math.random()));
      dispatch(setResetUniteAddons(Math.random()));
      formik.resetForm();
      formik.setFieldValue('EstateId', Cookies.get('estateId'));
    }
  };

  const formik = useFormik<Unit>({
    initialValues: {
      UniteName: row?.UniteName || '',
      UnitSpace: row?.UnitSpace || '',
      ElecMeters: row?.ElecMeters || '',
      WaterMeters: row?.WaterMeters || '',
      TelMeters: row?.TelMeters || '',
      GasMeters: row?.GasMeters || '',
      EstateId: row?.EstateId || Cookies.get('estateId') || '',
    },
    enableReinitialize: true, // Reinitialize form values when 'row' changes
    onSubmit: (values) => {
      updateUniteValue(values, formik);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 border-0 outline-0 rounded-md p-2 text-sm cursor-pointer text-white">
          <FaEdit className="text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between opacity-75 mt-2 text-sm relative">
            <DialogClose className="text-lg absolute left-0 -top-2" asChild>
              <button className="ml-auto mr-0 bg-transparent cursor-pointer">
                <IoClose className="text-[#0077bc]" />
              </button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className='w-full'>
          <form onSubmit={formik.handleSubmit} className='w-full'>
            <div className='flex items-center justify-between gap-4'>
              <InputCommon
                type="text"
                required
                id="UniteName"
                name="UniteName"
                placeholder="ادخل الوحده"
                label="اسم الوحده"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.UniteName}
                error={formik.touched.UniteName && formik.errors.UniteName}
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
                value={formik.values.UnitSpace}
                error={formik.touched.UnitSpace && formik.errors.UnitSpace}
              />
            </div>
            <div>
              <InputAdder
                formik={formik}
                placeholder="ادخل رقم عداد الكهرباء"
                name="ElecMeters"
                currentAddons={row.ElecMeters}
              />
              <InputAdder
                formik={formik}
                placeholder="ادخل رقم عداد الماء"
                name="WaterMeters"
                currentAddons={row.WaterMeters}
              />
              <InputAdder
                formik={formik}
                placeholder="ادخل رقم عداد الهاتف"
                name="TelMeters"
                currentAddons={row.TelMeters}
              />
              <InputAdder
                formik={formik}
                placeholder="ادخل رقم عداد الغاز"
                name="GasMeters"
                currentAddons={row.GasMeters}
              />
            </div>
            <div className="flex items-center justify-end mt-6">
              <Button
                type="submit"
                className="rounded-none bg-[#0077bc] hover:bg-[#0077bccd]"
              >
                {loading ? <LoadingSpinner color="text-white" /> : 'تحديث الوحدة'}
              </Button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUniteDialog;
