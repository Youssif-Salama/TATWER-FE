import { AskForValidateApi } from "@/api/profile/AskForValidateApi"
import { UpdateMyDataApi } from "@/api/profile/UpdateMyDataApi"
import LoadingSpinner from "@/common/LoadingSpinner"
import { setRefreshProfile } from "@/store/slices/GlobalSlice"
import { AppDispatch } from "@/store/store"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const MainProfileData = ({data}:any) => {
  const [loading, setLoading] = useState(false);
  const dispatch:AppDispatch=useDispatch();

  const formik=useFormik({
    initialValues:{
      Fname:data?.Fname,
      Lname:data?.Lname,
      Email:data?.Email,
      Password:data?.Password
    },
    onSubmit: async (values) => {
      let objData=values;
      if(values?.Fname==data?.Fname){
        delete objData?.Fname;
      }
      if(values?.Lname==data?.Lname){
        delete objData?.Lname;
      }
      if(values?.Email==data?.Email){
        delete objData?.Email;
      }
      if(values?.Password==data?.Password){
        delete objData?.Password;
      }
      const result = await UpdateMyDataApi(objData,setLoading);
      result && dispatch(setRefreshProfile(Math.random()));
      result && formik.resetForm();
    },
  })

  useEffect(()=>{
    formik.setValues({
      Fname:data?.Fname,
      Lname:data?.Lname,
      Email:data?.Email,
      Password:data?.Password
    })
  },[data])


  return (
    <div>
       <div className={`${data?.Verified===true?"bg-green-200":"bg-red-200"} mb-6 p-1 rounded-md`}>
          {data?.Verified===true?<p className="text-[10px]">الحساب مفعل</p>:<p className="text-[10px]">الحساب غير مفعل</p>}
        </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="flex items-start flex-col">
          <label htmlFor="Fname" className="text-[10px] text-[#0077bc]">الاسم الاول</label>
          <input type="text" name="Fname" id="Fname" className="border p-1 rounded-md mt-1 w-full text-[12px]"
            onChange={formik.handleChange}
            value={formik.values.Fname}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex items-start flex-col">
          <label htmlFor="Lname" className="text-[10px] text-[#0077bc]">الاسم الاخير</label>
          <input type="text" name="Lname" id="Lname" className="border p-1 rounded-md mt-1 w-full text-[12px]"
            onChange={formik.handleChange}
            value={formik.values.Lname}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex items-start flex-col">
          <label htmlFor="Email" className="text-[10px] text-[#0077bc]">البريد الالكتروني</label>
          <input type="text" name="Email" id="Email" className="border p-1 rounded-md mt-1 w-full text-[12px]"
            onChange={formik.handleChange}
            value={formik.values.Email}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex items-start flex-col">
          <label htmlFor="Password" className="text-[10px] text-[#0077bc]">كلمه السر</label>
          <input type="text" name="Password" id="Password" className="border p-1 rounded-md mt-1 w-full text-[12px]" placeholder="ادخل هنا كلمه المرور الجديده"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
          />
        </div>
        </div>
        <button
      type="submit"
      className={`text-[12px] bg-[#0077bc] text-white  rounded-md p-2 text-center my-4 w-full hover:bg-[#0077bcc7] border-0 outline-none
        `}>

          {
            loading?<LoadingSpinner color="text-[#fff]"/>:"تحديث البيانات"
          }
        </button>
      </form>
      <hr />
      <div className="mt-2">

        {
          data?.Verified==false && <div className="p-2 border rounded-md text-[12px] flex items-center justify-between">
          <p>طلب لتفعيل الحساب</p>
          <button className="p-1 bg-[#0077bc] text-white rounded-md"
          onClick={()=>{
            AskForValidateApi()
          }}
          >ارسال طلب</button>
        </div>
        }
      </div>
    </div>
  )
}

export default MainProfileData
