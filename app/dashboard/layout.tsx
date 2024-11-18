"use client";
import Header from "@/components/nav/Header";

import { AuthProvider } from "@/context/AuthProvider";
import { useMemo, useEffect, useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import SideBar from "@/components/nav/SideBar";

// create as imple layout for dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { sidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const memoizedSidebar = useMemo(
    () => <SideBar sidebarOpen={sidebarOpen} />,
    [sidebarOpen]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AuthProvider>
        {memoizedSidebar}
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-16" : "ml-[230px]"
          }`}
        >
          <Header setSidebarOpen={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className="p-8">{children}</main>
        </div>
      </AuthProvider>
    </div>
  );
}
