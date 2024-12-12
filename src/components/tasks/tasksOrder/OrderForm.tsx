import { GetAllOrderTypes } from '@/api/orderTypes/GetAllOrderTypes';
import { AddOrderApi } from '@/api/tasks/orders/AddOrderApi';
import { UpdateOrderApi } from '@/api/tasks/orders/UpdateOrderApi';
import InputCommon from '@/common/InputCommon';
import { Button } from '@/componentsShadcn/ui/button';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const OrderForm = ({setToUpdateOrder, setRefreshOrders, toUpdateOrder }: {setToUpdateOrder:any ,setRefreshOrders: (refreshOrders: any) => void ,toUpdateOrder:any}) => {
  const [loading,setLoading]=useState<boolean>(false);
  // @ts-ignore
  const [loadForOrderTypes,setLoadForOrderTypes]=useState<boolean>(false);
  const [orderTypes,setOrderTypes]=useState<any>([]);
  const formik = useFormik({
    initialValues: {
      OrderNumber: '',
      OrderLocation: '',
      OrderName: '',
      OrderType: 'elec',
      UserName: '',
      UserPassword: '',
      OrderPhone: '',
      OrderDate: '',
      OrderNotes: [{ Note: '', filePath: '' }],
      OrderStatus: 'pending',
    },
    onSubmit: async (values) => {
      if(toUpdateOrder){
        const result=await UpdateOrderApi(values,setLoading,toUpdateOrder._id);
        result && setRefreshOrders(Math.random());
      }
      else{
        const result=await AddOrderApi(values,setLoading);
        result && setRefreshOrders(Math.random());
      }
    },
  });

  useEffect(()=>{
   if(toUpdateOrder){
    formik.setValues(toUpdateOrder);
   }
   else{
    formik.resetForm();
   }
  },[toUpdateOrder])


  useEffect(()=>{
    const getAllOrderTypes=async()=>{
      const res=await GetAllOrderTypes(setLoadForOrderTypes);
      res&&setOrderTypes(res?.data?.data);
    }

    getAllOrderTypes();
  },[])

  return (
    <div>
      <div className='mt-6'>
        {
          toUpdateOrder?
          <div>
            <h1 className='text-[14px] text-[#0077bc]'>تعديل بيانات الطلب رقم {toUpdateOrder?.OrderNumber}</h1>
            <p className='underline text-[14px] text-red-500 cursor-pointer' onClick={() => setToUpdateOrder(null)}>الغاء التعديل</p>
          </div>:
          null
        }
      </div>
      <form onSubmit={formik.handleSubmit}>
        <InputCommon
          type="text"
          required
          id="OrderNumber"
          name="OrderNumber"
          placeholder="ادخل رقم الطلب هنا"
          label="رقم الطلب"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.OrderNumber}
          error={null}
        />

        <InputCommon
          type="text"
          id="OrderLocation"
          name="OrderLocation"
          placeholder="ادخل موقع الطلب هنا"
          label="موقع الطلب"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.OrderLocation}
          error={null}
        />

        <InputCommon
          type="text"
          id="OrderName"
          name="OrderName"
          placeholder="ادخل اسم الطلب هنا"
          label="اسم الطلب"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.OrderName}
          error={null}
        />

        <div className='flex items-center gap-4 justify-between mt-4'>
          <label htmlFor="OrderType" className='text-[14px] text-[#0077bc]'>نوع الطلب</label>
          <select
            id="OrderType"
            name="OrderType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.OrderType}
            className=" p-2 rounded-none w-[83%]"
          >
            {
              orderTypes?.map((orderType:any)=>{
                return(
                  <option key={orderType._id} value={orderType.Name}>{orderType.Name}</option>
                )
              })
            }
          </select>
        </div>

        <InputCommon
          type="text"
          id="UserName"
          name="UserName"
          placeholder="ادخل اسم المستخدم هنا"
          label="اسم المستخدم"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.UserName}
          error={null}
        />

        <InputCommon
          type="text"
          id="UserPassword"
          name="UserPassword"
          placeholder="ادخل كلمة المرور هنا"
          label="كلمة المرور"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.UserPassword}
          error={null}
        />

        <InputCommon
          type="text"
          id="OrderPhone"
          name="OrderPhone"
          placeholder="ادخل رقم الهاتف هنا"
          label="رقم الهاتف"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.OrderPhone}
          error={null}
        />

        <InputCommon
          type="date"
          id="OrderDate"
          name="OrderDate"
          label="تاريخ الطلب"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.OrderDate}
          error={null}
        />


        <Button type="submit" className="w-full rounded-none bg-[#0077bc] hover:bg-[#0077bca8] mt-4">
          {loading?<CgSpinner className='animate-spin'/>:`${toUpdateOrder?'تعديل':'اضافه'} الطلب`}
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
