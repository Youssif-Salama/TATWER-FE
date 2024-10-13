import { GetMyDataApi } from "@/api/profile/GetMyDataApi";
import { useEffect, useState } from "react";
import MainProfileData from "./MainProfileData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProfileData = () => {
  const [data, setData] = useState<any>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [openSubSections, setOpenSubSections] = useState<{ [key: string]: boolean }>({});
  const {refreshProfile}=useSelector((state:RootState)=>state.GlobalReducer)

  const getMe = async () => {
    const result = await GetMyDataApi();
    result && setData(result?.data?.data);
  };

  useEffect(() => {
    getMe();
  }, [refreshProfile]);

  // Toggle main section
  const toggleSection = (key: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // Toggle subsections (e.g., 'tenants', 'landlords')
  const toggleSubSection = (key: string) => {
    setOpenSubSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderPermissions = (actions: any) => {
    return (
      <ul className="ml-4">
        {Object.entries(actions).map(([action, hasPermission]: any) => (
          <li
            key={action}
            className={`flex justify-between text-sm mb-1 ${
              hasPermission ? "text-green-600" : "text-red-500"
            }`}
          >
            <span className="capitalize">{action}</span>
            <span>{hasPermission ? "مسموح" : "ممنوع"}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="grid-cols-3 grid max-md:grid-cols-1 gap-2 py-2">
      <div className="col-span-2 border p-2 rounded-md ">
        <MainProfileData data={data} />
      </div>
      <div className="col-span-1 border p-2 rounded-md ">
        <p className="text-xl font-semibold mb-4">الصلاحيات</p>
        {
          data &&
          Object.entries(data?.Pages).map(([key, value]: any) => (
            <div key={key} className="border p-4 rounded-md shadow-md mb-2" dir="ltr">
              {/* Main section title */}
              <div
                className="cursor-pointer text-[#0077bc] font-semibold mb-2"
                onClick={() => toggleSection(key)}
              >
                {key}
              </div>
              {/* Display inner entities if the section is open */}
              {openSections[key] && (
                <div className="ml-4">
                  {Object.entries(value).map(([entity, actions]: any) => (
                    <div key={entity}>
                      {/* Subsection title (like 'tenants', 'landlords') */}
                      <div
                        className="cursor-pointer text-gray-700 font-semibold"
                        onClick={() => toggleSubSection(entity)}
                      >
                        {entity !=="all" && entity}
                      </div>
                      {/* Render permissions if the subsection is open */}
                      {openSubSections[entity] && renderPermissions(actions)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProfileData;
