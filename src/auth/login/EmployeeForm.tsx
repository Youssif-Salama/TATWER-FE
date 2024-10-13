import { EmployeeLoginApi } from "@/api/employee/login";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const data={
      Email:email,
      Password:password
    }
    const result:any=await EmployeeLoginApi(data,setLoading);
    result && navigate("/");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
               البريد الالكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل البريد الالكتروني"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              كلمه السر
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل كلمه السر"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0077bc] w-full hover:bg-[#0077bccc] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? <LoadingSpinner color="text-white"/>: " دخول"}
            </button>
          </div>
          <div className="flex items-center justify-between">
          <div className="mt-2 text-[10px] flex items-center gap-1">
            <p className="opacity-75">هل نسيت كلمه السر</p>
            <Link to="/reset-password" className="text-[#0077bc] underline">هنا</Link>
          </div>
          <div className="mt-2 text-[10px] flex items-center gap-1">
            <p className="opacity-75">انشاء حساب</p>
            <Link to="/register" className="text-[#0077bc] underline">هنا</Link>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm
