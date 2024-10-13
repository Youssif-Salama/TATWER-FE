import ResetPassword from "@/auth/ResetPassword"
import { Helmet } from "react-helmet"

const Password = () => {
  return (
    <div>
      <Helmet>
        <title>تغيير كلمة المرور</title>
      </Helmet>
      <ResetPassword/>
    </div>
  )
}

export default Password
