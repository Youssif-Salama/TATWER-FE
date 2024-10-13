import React, { useEffect, useState } from "react";

interface Permission {
  post: boolean;
  delete: boolean;
  get: boolean;
  put: boolean;
}

interface Page {
  all: boolean;
  [key: string]: Permission | boolean;
}

interface PagesData {
  [key: string]: Page;
}

interface NestedEmployeePagesProps {
  data: {
    Pages: PagesData;
  };
}

const NestedEmployeePages: React.FC<NestedEmployeePagesProps> = ({ data }) => {
  const [pages, setPages] = useState<PagesData>({});

  useEffect(() => {
    setPages(data?.Pages);
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 text-[10px]" dir="ltr">
      {pages &&
        Object.entries(pages).map(([key, value]) => (
          <div className="bg-white border-2 border-[#0077bc] rounded-lg shadow-md p-4" key={key}>
            <h1 className="text-[#0077bc] text-xl font-bold">{key}</h1>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div className="mt-2" key={subKey}>
                <h2 className="text-[#0077bc] font-semibold">{subKey}</h2>
                <ul className="list-none p-0 grid grid-cols-4">
                  {Object.entries(subValue).map(([action, allowed]) => (
                    <li
                      key={action}
                      className={`py-1 ${allowed ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {action}: {allowed ? "Allowed" : "Not"}
                    </li>
                  ))}
                  {
                    subValue?"Allowed":"Not"
                  }
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default NestedEmployeePages;
