import { GetAllReportsApi } from "@/api/reports/GetAllReportsApi";
import { useEffect, useState } from "react";
import { BiUnite } from "react-icons/bi";
import * as Icons from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Report {
  name: string;
  count: number;
  icon: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  const getAllReports = async () => {
    try {
      const result = await GetAllReportsApi();
      if (result && result.data) {
        setReports(result.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  const getIconComponent = (iconName: string): IconType => {
    return (Icons as any)[iconName] || BiUnite;
  };

  return (
    <div className="grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2">
      {reports.map((report) => {
        const IconComponent = getIconComponent(report.icon);

        return (
          <div key={report.name} className="text-[12px] border border-[#0077bc] bg-gray-100 px-2 py-1 shadow-md rounded-md">
            <div className="py-1 flex items-center gap-2 justify-between">
              <div className="name font-bold text-[#0077bc]">{report.name}</div>
              <div className="icon">
                <IconComponent className="text-[#0077bc]" />
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between py-1">
              <div>العدد</div>
              <div className="count">{report.count}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reports;
