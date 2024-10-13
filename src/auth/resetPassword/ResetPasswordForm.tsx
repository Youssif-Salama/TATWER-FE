import { AskForResetPasswordApi } from "@/api/password/AskForResetPasswordApi";
import LoadingSpinner from "@/common/LoadingSpinner";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    const data = { Email: email };
  await AskForResetPasswordApi(data, setLoading);
  };

  return (
    <div className="flex items-center justify-center h-screen" dir="rtl">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-4">ارسال طلب اعادة تعيين كلمة المرور</h2>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#0077bc] w-full hover:bg-[#0077bccc] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? <LoadingSpinner color="text-white"/> : "ارسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm
