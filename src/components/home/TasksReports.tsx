import { GetAllTasksNoWithStatusApi } from '@/api/reports/GetAllReportsApi';
import  { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TasksReports = () => {
  const [employeesReports, setEmployeesReports] = useState([]);

  // Fetch the data when the component mounts
  const getEmployeesReports = async () => {
    try {
      const result = await GetAllTasksNoWithStatusApi();
      if (result && result.data) {
        setEmployeesReports(result.data);
      } else {
        console.error("No data returned from API");
      }
    } catch (error) {
      console.error("Error fetching employee reports:", error);
    }
  };

  useEffect(() => {
    getEmployeesReports();
  }, []);


  const COLORS = ['#0077bc', '#8eaccd'];


  return (
    <div style={{ width: '100%', height: '200px', }}> {/* Background color of the container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Outer Pie Chart */}
          <Pie
            data={employeesReports}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={30}
          >
            {/* @ts-ignore */}
            {employeesReports.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  strokeWidth={2} />
            ))}

          </Pie>

          <Pie
            data={employeesReports}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            label
          >
             {/* @ts-ignore */}
            {employeesReports.map((entry, index) => (
              <Cell key={`cell-inner-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksReports;
