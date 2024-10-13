import { Helmet } from "react-helmet"
import ProfileData from "./ProfileData"

const ProfileCollection = () => {
  return (
    <div className="py-8">
      <Helmet title="شركه تطوير البوادي | صفحه الاعدادات |  الملف الشخصي" />
      <div className="p-2 bg-[#0077bc] text-white text-center">الملف الشخصي</div>
      <ProfileData/>
    </div>
  )
}

export default ProfileCollection
