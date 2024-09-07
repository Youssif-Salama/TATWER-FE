import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Gregorian from "react-date-object/calendars/gregorian";
import Gregorian_locale from "react-date-object/locales/gregorian_ar";
import Hijiri from "react-date-object/calendars/arabic";
import Hijiri_locale from "react-date-object/locales/arabic_ar";

interface NormalDateComponentProps {
  required?: boolean;
  value: string | null;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
}

const NormalDateComponent: React.FC<NormalDateComponentProps> = ({
  required = false,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [dateType, setDateType] = useState<string>("g");
  const [date, setDate] = useState<DateObject | null>(
    value ? new DateObject(value) : null
  );

  useEffect(() => {
    setDate(value ? new DateObject(value) : null);
  }, [value]);

  const handleDateChange = (date: DateObject | null) => {
    if (date) {
      setDate(date);
      onChange(date.toDate().toISOString());
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative flex items-center gap-3 w-full">
        <div className="flex-1">
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
                setDateType("h");
              }}
            >
              هجري
            </span>
          </div>
          <div
            className="px-4 py-[8px] border-2 border-slate-200 w-full"
            style={{ position: "relative" }}
          >
            {dateType === "h" ? (
              <DatePicker
                style={{
                  border: 0,
                  borderRadius: 0,
                  width: "100%",
                  fontSize: "14px",
                }}
                calendar={Hijiri}
                locale={Hijiri_locale}
                value={date}
                onChange={handleDateChange}
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
                  fontSize: "14px",
                }}
                calendar={Gregorian}
                locale={Gregorian_locale}
                value={date}
                onChange={handleDateChange}
                format="YYYY/MM/DD"
                required={required}
                placeholder={placeholder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalDateComponent;
