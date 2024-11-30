import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/common/LoadingSpinner";
import { ResetPasswordApi } from "@/api/password/ResetPasswordApi";

const NewPasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {token} =useParams();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    const data = { token, Password:newPassword };
    const result = await ResetPasswordApi(data, setLoading);
    result && navigate("/login");
  };



  return (
    <div className="flex items-center justify-center h-screen" dir="rtl">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">تعيين كلمة المرور الجديدة</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ادخل كلمة المرور الجديدة"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0077bc] w-full hover:bg-[#0077bccc] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? <LoadingSpinner color="text-white"/> : "تعيين"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordForm;
