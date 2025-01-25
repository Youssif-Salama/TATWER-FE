import React, { useState } from 'react';

type CalendarProps = {
  year?: number;
  month?: number;
};

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [currentYear, setCurrentYear] = useState(year || new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(month || new Date().getMonth());

  const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const today = new Date();
  const isToday = (date: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = daysInMonth[0].getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  return (
    <div className="mx-auto border rounded-lg shadow-lg overflow-hidden text-[12px]">
      <div className="bg-[#0077bc] text-white flex justify-between items-center p-4">
        <button className="hover:bg-gray-300 hover:text-gray-800 px-2 py-1 rounded" onClick={handlePrevMonth}>السابق</button>
        <h2 className=" font-semibold">{`${currentYear} - ${new Intl.DateTimeFormat('ar-US', { month: 'long' }).format(new Date(currentYear, currentMonth))}`}</h2>
        <button className="hover:bg-gray-300 hover:text-gray-800 px-2 py-1 rounded" onClick={handleNextMonth}>التالي</button>
      </div>

      <div className="grid grid-cols-7 text-center bg-gray-200">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold text-gray-600 p-2">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}
        {daysInMonth.map((date) => (
          <div
            key={date.toISOString()}
            className={`p-4 border border-gray-300 ${isToday(date) ? 'bg-[#0077bc] text-white' : 'hover:bg-gray-300'}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
