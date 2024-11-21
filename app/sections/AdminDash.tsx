import React, { ComponentType, useEffect, useState } from "react";
import StatsCard from "@/components/cards/StatsCard";
import { HomeIcon } from "@heroicons/react/16/solid";
import { FiUser, FiUserX } from "react-icons/fi";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import BarChart from "@/components/charts/Barchart";
import PieChart from "@/components/charts/PieChart";

interface DashboardData {
  totalEmployees: number;
  totalDepartments: number;
  totalLeaveRequests: number;
  onLeaveToday: number;
}

const AdminDash = ({ role }: { role: string }) => {
  const [data, setData] = useState<DashboardData>({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaveRequests: 0,
    onLeaveToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Fetch employee count
        const { count: totalEmployees } = await supabase
          .from("employees")
          .select("*", { count: "exact" });

        let totalDepartments = 0;
        if (role !== "Department Manager") {
          // Only fetch if the user is not a Department Manager
          const { count } = await supabase
            .from("departments")
            .select("*", { count: "exact" });
          totalDepartments = count || 0;
        }

        // Fetch leave requests count
        const { count: totalLeaveRequests } = await supabase
          .from("leave_requests")
          .select("*", { count: "exact" });

        // Fetch on leave today count

        setData({
          totalEmployees: totalEmployees || 0,
          totalDepartments: totalDepartments || 0,
          totalLeaveRequests: totalLeaveRequests || 0,
          onLeaveToday: totalLeaveRequests || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [role]);

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex pt-10 lg:px-0 px-10  md:flex-row flex-col gap-y-4 items-center justify-between w-full">
        <StatsCard
          num={data?.totalEmployees}
          Icons={FiUser}
          name="Total Employees"
        />
        {role !== "Department Manager" && (
          <StatsCard
            num={data?.totalDepartments}
            Icons={
              HomeIcon as unknown as ComponentType<{
                size: number;
                className: string;
              }>
            }
            name="Total Departments"
          />
        )}
        <StatsCard
          num={data?.totalLeaveRequests}
          Icons={
            PencilSquareIcon as unknown as ComponentType<{
              size: number;
              className: string;
            }>
          }
          name="Total leave requests"
        />
        <StatsCard
          num={data?.onLeaveToday}
          Icons={FiUserX}
          name="On leave today"
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row  justify-between pt-10 ">
        <div className="lg:w-[75%] w-full h-full " style={{ height: "100%" }}>
          <BarChart />
        </div>
        <div className="md:w-[23%] w-full h-full " style={{ height: "100%" }}>
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default AdminDash;
