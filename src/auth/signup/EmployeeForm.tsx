import { EmployeeSignupApi } from "@/api/employee/signup";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      Fname: fname,
      Lname: lname,
      Email: email,
      Password: password,
      Phone: phone,
    };
    const result: any = await EmployeeSignupApi(data, setLoading);
    result && navigate("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">تسجيل حساب</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* Fname Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
              الاسم الأول
            </label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل الاسم الأول"
              required
            />
          </div>

          {/* Lname Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
              الاسم الأخير
            </label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل الاسم الأخير"
              required
            />
          </div>

          {/* Email Field */}
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

           {/* Phone Field */}
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              الهاتف
            </label>
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل الهاتف"
              required
              />
          </div>

          {/* Password Field */}
          <div className="mb-4 col-span-2">
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

            </div>
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0077bc] w-full hover:bg-[#0077bccc] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? <LoadingSpinner color="text-white" /> : " تسجيل"}
            </button>
          </div>

          {/* login Link */}
          <div className="mt-2 text-[10px] flex items-center gap-1">
            <p className="opacity-75"> لديك حساب؟</p>
            <Link to="/login" className="text-[#0077bc] underline">سجل هنا</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
