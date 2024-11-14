"use client";
import Header from "@/components/nav/Header";

import { AuthProvider } from "@/context/AuthProvider";
import { useMemo } from "react";
import { useSidebar } from "../hooks/useSidebar";
import SideBar from "@/components/nav/SideBar";

// create as imple layout for dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const memoizedSidebar = useMemo(
    () => <SideBar sidebarOpen={sidebarOpen} />,
    [sidebarOpen]
  );
  return (
    <div className="">
      <AuthProvider>
        {memoizedSidebar}
        <div
          className={`flex-1 transition-all w-56 duration-300 ease-in-out ${
            sidebarOpen ? "ml-16" : "ml-[230px]"
          } min-h-screen`}
        >
          {/* Header */}
          <Header setSidebarOpen={toggleSidebar} sidebarOpen={sidebarOpen} />
          <div className="w-full flex pt-25 p-8">{children}</div>
        </div>
      </AuthProvider>
    </div>
  );
}
