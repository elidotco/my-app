"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { createClient } from "@/utils/supabase/client";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = () => {
  const supabase = createClient();
  const [graphType, setGraphType] = useState("status");
  const [data, setData] = useState({
    labels: ["Probation", "Permanent", "Terminated"],
    datasets: [
      {
        label: "Employee Count",
        data: [0, 0, 0], // Default empty data
        backgroundColor: "#ff5714",
      },
    ],
  });

  // Fetch data based on graph type
  const fetchData = async (type: string) => {
    let newData: number[] = [];
    let newLabels: any[] = [];

    if (type === "status") {
      const { data: employees, error } = await supabase
        .from("employees")
        .select("employment_status");

      if (error) {
        return;
      }

      newLabels = ["Probation", "Permanent", "Terminated"];
      newData = newLabels.map(
        (status) =>
          employees.filter((e) => e.employment_status === status).length
      );
    } else if (type === "designation") {
      // Fetch unique designations
      const { data: designations, error } = await supabase
        .from("employees")
        .select("designation", { count: "exact" })
        .neq("designation", null);

      if (error) {
        console.error(error);
        return;
      }
      // Get unique designations and their counts
      newLabels = Array.from(new Set(designations.map((d) => d.designation)));
      newData = newLabels.map(
        (designation) =>
          designations.filter((d) => d.designation === designation).length
      );
    } else if (type === "department") {
      // Fetch unique departments
      const { data: departments, error } = await supabase
        .from("employees")
        .select("department", { count: "exact" })
        .neq("department", null);

      if (error) {
        console.error(error);
        return;
      }
      // Get unique departments and their counts
      newLabels = Array.from(new Set(departments.map((d) => d.department)));
      newData = newLabels.map(
        (department) =>
          departments.filter((d) => d.department === department).length
      );
    }

    setData({
      labels: newLabels,
      datasets: [
        {
          label: "Employee Count",
          data: newData,
          backgroundColor: "#ff5714",
        },
      ],
    });
  };

  // Update graph type and fetch data when it changes
  useEffect(() => {
    fetchData(graphType);
  }, [graphType]);

  const handleGraphType = (type: string) => {
    setGraphType(type);
  };

  return (
    <div className="h-full w-full rounded-md border border-stroke bg-white md:p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="pl-5 py-4 justify-between w-full gap-4 sm:flex">
        <div>
          <h4 className="text-xl text-black dark:text-white">
            Employee statistics
          </h4>
        </div>
        <div className="flex gap-x-3">
          <p
            onClick={() => handleGraphType("status")}
            className={`text-[12px] cursor-pointer ${graphType === "status" ? "text-orange-500" : ""} hover:text-orange-500`}
          >
            By Employment Status
          </p>
          <p
            onClick={() => handleGraphType("designation")}
            className={`text-[12px] cursor-pointer ${graphType === "designation" ? "text-orange-500" : ""} hover:text-orange-500`}
          >
            By Designation
          </p>
          <p
            onClick={() => handleGraphType("department")}
            className={`text-[12px] cursor-pointer ${graphType === "department" ? "text-orange-500" : ""} hover:text-orange-500`}
          >
            By Department
          </p>
        </div>
      </div>

      <div className="h-full w-full">
        <div id="chartTwo" className="lg:ml-5 z-0 w-full h-[40vh]">
          <Bar
            data={data}
            options={{ indexAxis: "y", maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
