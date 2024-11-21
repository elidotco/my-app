"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useState } from "react";
import AdminDash from "../../sections/AdminDash";
import EmployDash from "../../sections/EmployDash";
import PunchInOutButton from "@/components/buttons/PunchButton";

const Home = () => {
  const { user, employeeData, loading } = useAuth();

  const [emp, setEmp] = useState(employeeData?.role);
  const [emps, setEmps] = useState(employeeData?.role);

  return (
    <div className="w-full h-full pt-10 ">
      {/* Hello World
      {user?.email}
      {employeeData?.name} */}
      <div className="w-full">
        {/* Content */}

        <div className="w-full items-center pl-10 md:flex-row flex-col flex justify-between">
          <h1 className="text-2xl pt-4 font-[400]">Dashboard</h1>
          {/* Buttons */}
          <div className="flex pt-10 gap-x-3">
            {emps !== "Employee" ? (
              <>
                <PunchInOutButton />
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-sm border border-orange-500 py-[6px] px-10 text-center  text-orange-500  hover:bg-orange-500 hover:text-white transition-all ease-in-out duration-100 lg:px-8 xl:px-5"
                  onClick={() =>
                    setEmp(emp === "Employee" ? "Admin" : "Employee")
                  }
                >
                  <span>
                    View as {emp === "Employee" ? "Admin" : "Employee"}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <PunchInOutButton />
              </>
            )}
          </div>

          {/* Buttons */}
        </div>
        {emp !== "Employee" ? (
          <AdminDash role={employeeData?.role} />
        ) : (
          <EmployDash name={employeeData?.name} />
        )}
      </div>
    </div>
  );
};

export default Home;
