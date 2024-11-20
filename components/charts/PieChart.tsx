"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { createClient } from "@/utils/supabase/client";
// Adjust this import to your Supabase client path

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const supabase = createClient();
  const [attendanceData, setAttendanceData] = useState([0, 0, 0]); // Stores counts for [Early, Late, Regular]
  const [totalAttendance, setTotalAttendance] = useState(0);

  const fetchAttendanceData = async () => {
    const { data, error } = await supabase.from("attendance").select("status"); // Assuming 'status' column has values like 'Early', 'Late', 'Regular'

    if (error) {
      console.error("Error fetching attendance data:", error);
      return;
    }

    // Count occurrences for each status
    const counts = { Early: 0, Late: 0, Regular: 0 };
    data.forEach((record) => {
      const status = record.status as keyof typeof counts;
      if (counts.hasOwnProperty(status)) {
        counts[status]++;
      }
    });

    // Update chart data
    setAttendanceData([counts.Early, counts.Late, counts.Regular]);
    setTotalAttendance(counts.Early + counts.Late + counts.Regular);
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const chartData = {
    labels: ["Early", "Late", "Regular"],
    datasets: [
      {
        label: "Attendance",
        data: attendanceData,
        backgroundColor: [
          "rgb(234, 131, 58)",
          "rgb(223, 71, 54)",
          "rgb(92, 222, 100)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full border h-full rounded-md border-stroke bg-white pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 justify-between w-full h-full gap-4 sm:flex">
        <div className="flex pb-5 px-7 items-center flex-wrap border-b w-full gap-2">
          <h5 className="text-xl text-black dark:text-white">
            Total Attendance
          </h5>
          <p>Today - {totalAttendance}</p>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="px-17 flex justify-center">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col flex-wrap w-full gap-y-3">
        <div className="sm:w-1/2 w-full pl-5">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#ea833a]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Early</span>
              <span>{attendanceData[0]}</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full pl-5">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#df4736]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Late</span>
              <span>{attendanceData[1]}</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full pl-5">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#5cde64]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Regular</span>
              <span>{attendanceData[2]}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
