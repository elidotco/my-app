import React, { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { data } from "autoprefixer";
import ProgressBar from "./ProgressBar";

interface Schedule {
  start_time: string;
  end_time: string;
}
interface TimeLog {
  punchin: string;
  punchout: string;
  hours_worked: number;
}
interface MonthLog {
  hours_worked: number;
}
interface TimeLogs {
  schedule?: Schedule; // `schedule` is optional if it might not exist
  totalScheduledHours?: number; // `totalScheduledHours` is optional if it might not exist
  isWorkingDay?: boolean; // `isWorkingDay` is optional if it might not exist
}
export const calculateHours = (start: string, end: string) => {
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
const TimeLog = ({ logs }: { logs: TimeLog[] }) => {
  const { employeeData } = useAuth();
  const supabase = createClient();
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss")); // Initialize state for current time
  const [timeLogs, setTimeLogs] = useState<TimeLogs | null>(null);
  const [loading, setLoading] = useState(true); // State for loader
  const [monthLog, setMonthLog] = useState<MonthLog[] | null>(null); // State for loader
  const today = dayjs().format("YYYY-MM-DD");
  console.log(timeLogs);
  const calculateMonthlySchedule = (schedule: {
    start_time: string;
    end_time: string;
    working_days: string[];
  }) => {
    const { start_time, end_time, working_days } = schedule;

    // Helper function to calculate hours between two times

    const dailyHours = calculateHours(start_time, end_time); // Hours worked in one day
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get total days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Iterate through the days of the current month
    let totalScheduledHours = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayName = date.toLocaleString("en-us", { weekday: "long" });

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

  //   Get the current month timelogs
  const getMonthLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("attendance")
        .select("hours_worked")
        .eq("employeeid", employeeData.employeeid)
        .gte("date", new Date(new Date().setDate(1)).toISOString()) // Start of the current month
        .lt(
          "date",
          new Date(
            new Date().setMonth(new Date().getMonth() + 1, 1)
          ).toISOString()
        ); // Start of the next month

      if (error) {
        console.error("Error fetching attendance data:", error);
      } else {
        setMonthLog((data as MonthLog[]) || null);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      return data;
      setLoading(false); // Hide loader after fetching
    }
  };

  useEffect(() => {
    getShift();
    getMonthLogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm:ss")); // Update current time every second
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const monthlo = monthLog?.reduce((total, log) => total + log.hours_worked, 0);

  const worked = logs.map((log) => {
    console.log(currentTime);
    let worked = 0;
    if (log.punchout === null) {
      worked += calculateHours(log.punchin, currentTime);
    }
    worked += log.hours_worked;
    return worked;
  });
  const totalWorked = worked.reduce((sum, hours) => sum + hours, 0);
  console.log(`Total worked hours: ${totalWorked.toFixed(2)} hours`);

  const workedPercentage = Math.min(
    ((monthlo || 0) / (timeLogs?.totalScheduledHours || 1)) * 100,
    100
  ).toFixed(2);
  const shortage = 100 - (workedPercentage as any);

  console.log(workedPercentage);
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
          <p>
            {totalWorked
              ? (() => {
                  const hoursInt = Math.floor(totalWorked);
                  const minutes = Math.round((totalWorked - hoursInt) * 60);
                  return `${hoursInt.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                })()
              : "00:00"}
            {"      "}
            Worked
          </p>
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
        <ProgressBar workedPercentage={workedPercentage} shortage={shortage} />
      </div>
    </div>
  );
};

export default TimeLog;
