import { Helmet } from "react-helmet";
import EmployeeForm from "./signup/EmployeeForm";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
      <Helmet title="تسجيل حساب جديد"/>
        <div>
         <EmployeeForm />
        </div>
    </div>
  );
};

export default Signup;
