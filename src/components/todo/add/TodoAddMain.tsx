import InputCommon from "@/common/InputCommon";
import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import GetEmployees from "./GetEmployees";
import { FaTrash } from "react-icons/fa6";
import Cookies from "js-cookie";

const TodoAddMain = ({ formik, currentMaintask }: any) => {
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  const [catchPriority, setCatchPriority] = useState<string>("low");
  const [employees, setEmployees] = useState<any>([]);
  const [empId, setEmpId] = useState<any>([]);
  const [empsToDisplay, setEmpsToDisplay] = useState<any>([]);


  useEffect(() => {
    if (employees?._id) {
      setEmpId((prevEmpId: any) => {
        if (!prevEmpId.includes(employees._id)) {
          return [...prevEmpId, employees._id];
        }
        return prevEmpId;
      });

      setEmpsToDisplay((prevEmpsToDisplay: any) => {
        if (!prevEmpsToDisplay.some((emp: any) => emp._id === employees._id)) {
          return [...prevEmpsToDisplay, employees];
        }
        return prevEmpsToDisplay;
      });
    }
  }, [employees]);

  useEffect(() => {
    formik.setFieldValue("AssigneeId", empId);
  }, [empId]);

  useEffect(() => {
    if (values[0] && values[1]) {
      const startDate = `${values[0].year}-${String(values[0].month.number).padStart(2, '0')}-${String(values[0].day).padStart(2, '0')}`;
      const dueDate = `${values[1].year}-${String(values[1].month.number).padStart(2, '0')}-${String(values[1].day).padStart(2, '0')}`;
      formik.setFieldValue("StartDate", startDate);
      formik.setFieldValue("DueDate", dueDate);
    }
  }, [values]);

  useEffect(() => {
    formik.setFieldValue("Priority", catchPriority);
  }, [catchPriority]);

  useEffect(() => {
    if (currentMaintask) {
      setCatchPriority(currentMaintask.Priority);

      const startDate = new Date(currentMaintask.StartDate);
      const dueDate = new Date(currentMaintask.DueDate);

      if (!isNaN(startDate.getTime()) && !isNaN(dueDate.getTime())) {
        // Subtract 1 day from each date
        const adjustedStartDate = new Date(startDate);
        adjustedStartDate.setDate(startDate.getDate());

        const adjustedDueDate = new Date(dueDate);
        adjustedDueDate.setDate(dueDate.getDate());

        setValues([
          new DateObject(adjustedStartDate),
          new DateObject(adjustedDueDate),
        ]);
      }

      setEmpsToDisplay(currentMaintask.AssigneeId);

      if (Array.isArray(currentMaintask.AssigneeId)) {
        const empIds = currentMaintask.AssigneeId.map((assignee: any) => assignee._id);
        setEmpId(empIds);
      } else {
        setEmpId([]);
      }
    }
    console.log(currentMaintask);

  }, [currentMaintask]);

  useEffect(() => {
    console.log(empsToDisplay);
  }, [empsToDisplay]);






  return (
    <div>
      {currentMaintask && (
        <div className="bg-[#0077bc] p-1 relative">
          <div
          onClick={() => {
            Cookies.remove("currentTaskId");
            window.location.reload();
          }}
          className="text-white bg-[#0077bc] px-2 p-1 absolute -top-7 left-0 cursor-pointer hover:bg-[#0077bcce]">
            اضافه مهمه جديده
          </div>
          <div className="text-[#0077bc] bg-white text-center p-1">
            تعديل المهمه
          </div>
        </div>
      )}
      <form>
        {/* Title Input */}
        <div className="flex items-end justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <div className="sm:w-[45%]">
            <InputCommon
              type="text"
              required
              id="Title"
              name="Title"
              placeholder="ادخل العنوان هنا"
              label="العنوان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Title}
              error={
                formik.errors && formik.touched.Title && formik.errors.Title
              }
            />
          </div>

          {/* Date Picker */}
          <div className="flex gap-3 items-center sm:w-[45%]">
            <label
              htmlFor="date"
              className="text-[#0077bc] text-[12px] text-sm"
            >
              التاريخ
            </label>
            <DatePicker
              inputClass="rounded-none w-full px-2 py-2 mx-auto placeholder:text-gray-400 text-[14px] border-2"
              value={values}
              id="date"
              name="date"
              onChange={setValues}
              range
              plugins={[<DatePanel />]}
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="flex gap-3 items-center mt-6">
          <label
            htmlFor="Description"
            className="text-[#0077bc] text-[12px] text-sm"
          >
            الوصف
          </label>
          <textarea
            name="Description"
            id="Description"
            placeholder="ادخل الوصف هنا"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Description}
            rows={3}
            className="rounded-none w-full px-2 py-2 mx-auto placeholder:text-gray-400 text-[14px] border-2"
          />
        </div>

        {/* Priority Selector */}
        <div className="flex flex-col max-sm:flex-col gap-3 items-start mt-6">
          <label
            htmlFor="Priority"
            className="text-[#0077bc] text-[12px] text-sm"
            aria-label="اختر الاهمية"
          >
            الاهميه
          </label>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-2 w-full">
            {["low", "medium", "high"].map((priority) => (
              <div
                key={priority}
                className={`${
                  catchPriority === priority && "bg-[#0077bc] text-white"
                } col-span-1 border border-[#0077bc] p-2 text-center cursor-pointer transition duration-300 ease-in-out hover:bg-[#0077bc] hover:text-white text-[#0077bc]`}
                role="button"
                aria-label={`اهميه ${priority}`}
                onClick={() => setCatchPriority(priority)}
              >
                {priority === "low"
                  ? "اهميه قليله"
                  : priority === "medium"
                  ? "متوسط الاهميه"
                  : "مهم جدا"}
              </div>
            ))}
          </div>
        </div>

        {/* Assign to Section */}
        <div className="flex flex-col gap-3 items-start mt-6">
          <label
            htmlFor="assign"
            className="text-[#0077bc] text-[12px] text-sm"
          >
            اسناد الي
          </label>
          <GetEmployees setEmployees={setEmployees} setEmpId={setEmpId} setEmpsToDisplay={setEmpsToDisplay} />
        </div>

        {/* Selected Employees Display */}
        {empsToDisplay.length > 0 && (
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mt-6 w-full text-[12px]">
            {empsToDisplay.map((emp: any) => (
              <div
                key={emp._id}
                className="p-2 border border-[#0077bc] text-center relative"
              >
                {emp.Fname} {emp.Lname}
                <div className="absolute -top-2 -right-2 bg-white border border-[#0077bc] text-red-500 p-1 rounded-full text-[8px] cursor-pointer"
                  onClick={() => {
                    setEmpsToDisplay((prev: any) => prev.filter((item: any) => item._id !== emp._id));
                    setEmpId((prev: any) => prev.filter((item: any) => item !== emp._id));
                  }}>
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoAddMain;
