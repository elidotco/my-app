"use client";

import JobHistory from "@/app/sections/JobHistory";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { use } from "react";
import {
  PiCalendarBlankThin,
  PiClockAfternoonThin,
  PiSuitcaseLight,
  PiTagThin,
} from "react-icons/pi";
import { FiUser } from "react-icons/fi";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pathname = usePathname();

  const filters = use(searchParams);
  const fullUrl = `${pathname}?tab=hello world`;
  console.log((filters.tab as string).split(" ").join("_"));
  return (
    <div className="pt-20">
      Helllo
      <Link href={fullUrl}>next</Link>
      <>
        <p className="text-2xl font-medium mb-5 px-10">Job Desk</p>
        <div className="flex justify-between py-10  px-20 items-center w-full bg-white shadow rounded-md">
          {/* USer Profile */}
          <div className="flex justify-between gap-x-20 items-center">
            <div className="w-36 h-36 bg-green-300 rounded-full"></div>
            <div className="flex flex-col item-center">
              <h3 className="text-2xl text-medium">John Doe</h3>
              <p className="px-5 py-1 mb-2 text-white rounded-full text-sm bg-blue-500">
                permanent
              </p>
              <p className="text-sm text-light text-gray-500">Emp 1</p>
              <p className="text-sm text-light text-gray-500">App Admin</p>
            </div>
          </div>
          {/* USer Profile */}

          <div className="flex justify-between flex-col gap-10 px-5 border-l">
            <div className="flex items-center gap-2">
              <PiSuitcaseLight size={35} className="text-orange-400" />
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">Department</p>
                <p className=" text-sm">Main Department</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PiClockAfternoonThin size={35} className="text-orange-400" />
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">Work Shift</p>
                <p className="text-sm">Regular Shift</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col gap-10 px-5 border-l">
            <div className="flex items-center gap-2">
              <PiTagThin size={35} className="text-orange-400" />
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">Designation</p>
                <p className=" text-sm">Director</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PiCalendarBlankThin size={35} className="text-orange-400" />
              <div className="flex flex-col">
                <p className="text-gray-500 text-sm">Date Joined</p>
                <p className=" text-sm">Not set yet</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full min-h-screen">
          <div className="flex mt-10   w-full justify-between item-center">
            {/* MENU */}
            <div className=" lg:w-1/4 xl:w-[15%] shadow rounded-md bg-white">
              {/* ICON */}
              <div className="w-full h-[13%] relative bg-gray-50">
                <div className="w-14 h-14 flex items-center justify-center rounded-full absolute  right-[40%] text-light -bottom-1/4 bg-white">
                  <FiUser size={25} />
                </div>
              </div>
              {/* ICON */}
              {/* LIST */}
              <ul className="flex px-10 py-20 flex-col gap-10">
                <li className="text-gray-400 hover:text-black text-sm">
                  Leave Allowance
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Attendance
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Leave
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Job History
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Salary Overview
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Payrun and badge
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Payslip
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Address Details
                </li>
                <li className="text-gray-400 hover:text-black text-sm">
                  Emergency Contacts
                </li>
                <li className="text-gray-300 hover:text-black text-sm"></li>
              </ul>
              {/* LIST */}
            </div>
            {/* MENU */}
            <div className="lg:w-[72%] xl:w-[83%] shadow rounded-md h-full md:overflow-x-scroll xl:overflow-visible bg-white">
              {/* <Attendance /> */}
              {/* <Leave /> */}
              <JobHistory />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
