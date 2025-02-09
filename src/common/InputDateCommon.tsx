import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Gregorian from "react-date-object/calendars/gregorian";
import Gregorian_locale from "react-date-object/locales/gregorian_ar";
import Hijiri from "react-date-object/calendars/arabic";
import Hijiri_locale from "react-date-object/locales/arabic_ar";

interface InputCommonProps {
  required?: boolean;
  formik: any;
  value: string;
  onBlur: any;
  id: string;
  name: string;
  placeholder?: string;
  label: string;
  error: any;
}

const InputDateCommon: React.FC<InputCommonProps> = ({
  required = false,
  formik,
  placeholder,
  onBlur,
  id,
  name,
  label,
  error,
}) => {
  const [dateType, setDateType] = useState<string>("g");
  const [date, setDate] = useState<DateObject | null>(
    formik.values[name] ? new DateObject(formik.values[name]) : null
  );

  useEffect(() => {
    setDate(formik.values[name] ? new DateObject(formik.values[name]) : null);
  }, [formik.values[name]]);

  const handleDateChange = (date: DateObject | null) => {
    if (date) {
      setDate(date);
      formik.setFieldValue(name, date.toDate().toISOString());
    }
  };

  return (
    <div className="flex items-center gap-3 w-full" dir="rtl">
      <div className="flex-1">
        <div className="mb-1 h-[15px]" />
        <label htmlFor={id} className="text-[#0077bc] text-[12px] text-sm">
          {label}
        </label>
      </div>

      <div className="flex-[5] flex flex-col relative">
        <div className="text-red-500 text-[10px] mb-1 h-[15px]">
          {error && error}
        </div>
        <div className="absolute -top-[9px] left-0 text-[12px] flex items-center gap-2">
          <span
            className={`cursor-pointer p-1 ${
              dateType === "g"
                ? "border-2 border-slate-200 text-[#0077bc]"
                : "text-slate-500"
            }`}
            onClick={() => {
              if (name == "DocumentDate") {
                formik.setFieldValue("DocumentDateType", "g");
              } else if (name == "ContractReleaseDate") {
                formik.setFieldValue("ReleaseDateType", "g");
              }
              setDateType("g");
            }}
          >
            ميلادي
          </span>
          <span
            className={`cursor-pointer p-1 ${
              dateType === "g"
                ? "text-slate-500"
                : "border-2 border-slate-200 text-[#0077bc]"
            }`}
            onClick={() => {
              {
                if (name == "DocumentDate") {
                  formik.setFieldValue("DocumentDateType", "h");
                } else if (name == "ContractReleaseDate") {
                  formik.setFieldValue("ReleaseDateType", "h");
                }
                setDateType("h");
              }
            }}
          >
            هجري
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
          className="px-4 py-[8px] border-2 border-slate-200 "
        >
          {dateType === "h" ? (
            <DatePicker
              style={{
                border: 0,
                borderRadius: 0,
                width: "100%",
                flex: 1,
                fontSize: "14px",
              }}
              calendar={Hijiri}
              locale={Hijiri_locale}
              value={date}
              onChange={handleDateChange}
              // @ts-ignore
              onBlur={onBlur}
              format="YYYY/MM/DD"
              required={required}
              placeholder={placeholder}
            />
          ) : (
            <DatePicker
              style={{
                border: 0,
                borderRadius: 0,
                width: "100%",
                flex: 1,
                fontSize: "14px",
              }}
              calendar={Gregorian}
              locale={Gregorian_locale}
              value={date}
              onChange={handleDateChange}
              // @ts-ignore
              onBlur={onBlur}
              format="YYYY/MM/DD"
              required={required}
              placeholder={placeholder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputDateCommon;