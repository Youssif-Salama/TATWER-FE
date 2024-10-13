import EmployeeForm from "./login/EmployeeForm";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
      <Helmet title="تسجيل الدخول"/>
        <div>
         <EmployeeForm />
        </div>
    </div>
  );
};

export default Login;
