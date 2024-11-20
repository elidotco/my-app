import React, { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";

const TimeLog = () => {
  const { employeeData } = useAuth();
  const supabase = createClient();
  const [timeLogs, setTimeLogs] = useState();
  const [loading, setLoading] = useState(true); // State for loader
  const today = dayjs().format("YYYY-MM-DD");

  console.log(timeLogs);
  const calculateHours = (start: string, end: string) => {
    if (!start || !end) {
      console.error("Invalid start_time or end_time:", { start, end });
      return 0;
    }

    // Split the time into hours and minutes
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    if (
      isNaN(startHours) ||
      isNaN(startMinutes) ||
      isNaN(endHours) ||
      isNaN(endMinutes)
    ) {
      console.error("Failed to parse time values:", { start, end });
      return 0;
    }

    // Calculate total hours
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Handle cases where end_time might be on the next day (e.g., 23:00 to 02:00)
    const dailyMinutes =
      endTotalMinutes >= startTotalMinutes
        ? endTotalMinutes - startTotalMinutes
        : 1440 - startTotalMinutes + endTotalMinutes;

    const hours = dailyMinutes / 60;

    return hours;
  };
  const calculateMonthlySchedule = (schedule: {
    start_time: string;
    end_time: string;
    working_days: string[];
  }) => {
    const { start_time, end_time, working_days } = schedule;
    console.log(schedule);

    // Helper function to calculate hours between two times

    const dailyHours = calculateHours(start_time, end_time); // Hours worked in one day
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get total days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    // Iterate through the days of the current month
    let totalScheduledHours = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayName = date.toLocaleString("en-us", { weekday: "long" });
      console.log(dayName);

      // Check if this day is a working day
      if (working_days.includes(dayName)) {
        totalScheduledHours += dailyHours; // Add daily hours to the total
      }
    }

    return totalScheduledHours;
  };

  //   getEmployee schudle type
  const getShift = async () => {
    try {
      setLoading(true); // Show loader while fetching
      const { data, error } = await supabase
        .from("schedules")
        .select("start_time, end_time, working_days")
        .eq("id", employeeData.schedule);

      if (error) {
        console.error("Error fetching time logs:", error.message);
        return;
      }

      if (data && data.length > 0) {
        // Define type for schedule data
        type Schedule = {
          start_time: string;
          end_time: string;
          working_days: string[];
        };

        const schedule: Schedule = data[0];
        const currentDay = new Date().toLocaleString("en-us", {
          weekday: "long",
        });

        // Calculate monthly scheduled hours
        const totalScheduledHours = calculateMonthlySchedule(schedule);

        setTimeLogs({
          schedule: schedule,
          totalScheduledHours,
          isWorkingDay: schedule.working_days.includes(currentDay),
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };

  useEffect(() => {
    getShift();
  }, []);

  return (
    <div className="lg:w-[29%] w-full bg-white rounded-sm shadow-md">
      <div className="border-b py-6 px-6">
        <h2 className="text-lg font-semibold">Time Log</h2>
      </div>
      <div className="mt-4 mx-6">
        <div className="border-b pt-5">
          <p className="text-gray-600">Today</p>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <p>
            {timeLogs?.schedule
              ? (() => {
                  const hours = calculateHours(
                    timeLogs.schedule.start_time,
                    timeLogs.schedule.end_time
                  );
                  const hoursInt = Math.floor(hours);
                  const minutes = Math.round((hours - hoursInt) * 60);
                  return `${hoursInt.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                })()
              : "00:00"}{" "}
            Scheduled
          </p>
          <p>06:00 Worked</p>
          <p>00:00 Break</p>
          <p>-2:00 Balance</p>
        </div>
      </div>
      <div className="mt-6 mx-6">
        <div className="border-b px-6">
          {" "}
          <p className="text-gray-600">This month</p>
        </div>
        <div className="mt-2 pb-5 flex items-center">
          <div className="flex justify-center rounded-sm mr-2 items-center p-3 bg-[#ff5714]">
            <ClockIcon className="w-6 h-6 text-slate-50" />
          </div>
          <div className="flex flex-col text-left">
            <p className=" text-xl">{timeLogs?.totalScheduledHours}h</p>
            <p className="text-gray-500">Total schedule time</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Worked time - 218 h</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-[#ff5714] h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Shortage time - 0 m</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1"></div>
          <p className="text-sm text-gray-600 mt-2">Over time - 50 h</p>
          <div
            className="w-full bg-[#ff5714] rounded-full h-2 mt-1"
            style={{ width: "25%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimeLog;
