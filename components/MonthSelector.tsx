import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfToday,
  startOfWeek,
  startOfMonth,
  startOfYear,
  isAfter,
  subWeeks,
  endOfWeek,
} from "date-fns";

const MonthSelector = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("This Month"); // Track active filter

  // Get the current date for comparison
  const today = new Date();

  // Format the month and year to display (e.g., "March, 2024")
  const formattedDate = format(currentDate, "MMMM, yyyy");

  // Navigation functions
  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
    setSelectedFilter(""); // Clear filter when navigating manually
  };

  const handleNextMonth = () => {
    if (isAfter(addMonths(currentDate, 1), today)) return;
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
    setSelectedFilter(""); // Clear filter when navigating manually
  };

  // Quick filter functions with filter state setting
  const handleToday = () => {
    setCurrentDate(startOfToday());
    setSelectedFilter("Today");
  };

  const handleThisWeek = () => {
    setCurrentDate(startOfWeek(today, { weekStartsOn: 1 })); // Week starts on Monday
    setSelectedFilter("This Week");
  };

  const handleLastWeek = () => {
    const lastWeekStart = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
    setCurrentDate(lastWeekStart); // Set to start of last week for display
    setSelectedFilter("Last Week");

    // Optionally, you can store both `lastWeekStart` and `lastWeekEnd`
    // if you want to query data within this date range.
  };

  const handleThisMonth = () => {
    setCurrentDate(startOfMonth(today));
    setSelectedFilter("This Month");
  };

  const handleLastMonth = () => {
    setCurrentDate(startOfMonth(subMonths(today, 1)));
    setSelectedFilter("Last Month");
  };

  const handleThisYear = () => {
    setCurrentDate(startOfYear(today));
    setSelectedFilter("This Year");
  };

  return (
    <div className="space-y-4 flex justify-between py-7 border-b px-10">
      {/* Month Selector */}
      <div className="flex items-center space-x-4">
        <button onClick={handlePreviousMonth} className="text-gray-500">
          &lt;
        </button>
        <span className="text-blue-500 font-semibold">{formattedDate}</span>
        {!isAfter(addMonths(currentDate, 1), today) && (
          <button onClick={handleNextMonth} className="text-gray-500">
            &gt;
          </button>
        )}
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex space-x-4 text-sm">
        <button
          onClick={handleToday}
          className={`${
            selectedFilter === "Today" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          Today
        </button>
        <button
          onClick={handleThisWeek}
          className={`${
            selectedFilter === "This Week" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          This Week
        </button>
        <button
          onClick={handleLastWeek}
          className={`${
            selectedFilter === "Last Week" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          Last Week
        </button>
        <button
          onClick={handleThisMonth}
          className={`${
            selectedFilter === "This Month" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          This Month
        </button>
        <button
          onClick={handleLastMonth}
          className={`${
            selectedFilter === "Last Month" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          Last Month
        </button>
        <button
          onClick={handleThisYear}
          className={`${
            selectedFilter === "This Year" ? "text-blue-500" : "text-gray-600"
          }`}
        >
          This Year
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
