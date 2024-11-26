import Attendance from "@/app/sections/Attendance";
import JobHistory from "@/app/sections/JobHistory";
import LeaveAllowance from "@/app/sections/LeaveAllowance";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiUser } from "react-icons/fi";

const Tab = ({ param, id }: { param: string[]; id: string }) => {
  const menuItems = [
    { name: "Leave Allowance", path: "leave allowance" },
    { name: "Attendance", path: "attendance" },
    { name: "Leave", path: "leave" },
    { name: "Job History", path: "job history" },
    { name: "Salary Overview", path: "salary overview" },
    { name: "Payrun and badge", path: "payrun" },
    { name: "Payslip", path: "payslip" },
    { name: "Address Details", path: "address details" },
    { name: "Emergency Contacts", path: "emergency contacts" },
    { name: "", path: "" }, // Empty item
  ];
  const pathname = usePathname();
  const fullUrl = `${pathname}?tab=hello world`;
  console.log(fullUrl);
  console.log(param.join(" "));
  return (
    <>
      <div className="flex w-full mt-10 min-h-screen">
        <div className="flex mt-10 w-full justify-between items-center">
          {/* MENU */}
          <div className=" lg:w-1/4 h-full xl:w-[15%] shadow rounded-md bg-white">
            {/* ICON */}
            <div className="w-full h-[9%] relative bg-gray-100">
              <div className="w-12 h-12 flex items-center justify-center rounded-full absolute  right-[40%] text-light -bottom-1/4 bg-white">
                <FiUser size={23} />
              </div>
            </div>
            {/* ICON */}
            {/* LIST */}
            <ul className="flex px-10 py-20 flex-col gap-10">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`text-gray-${item.path === param.join(" ") ? "700" : "300"} hover:text-black text-sm`}
                >
                  <Link href={`${pathname}?tab=${item.path}`}>
                    {" "}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* LIST */}
          </div>
          {/* MENU */}
          <div className="lg:w-[72%] xl:w-[83%] shadow rounded-md h-full md:overflow-x-scroll xl:overflow-visible bg-white">
            <div className=" w-full h-full">
              <div className="w-full p-10 h-[5%] flex items-center  border-b">
                <p className="text-xl capitalize">{param.join(" ")}</p>
              </div>

              {/* <Attendance /> */}
              <Attendance />
              {/* <LeaveAllowance id={id} /> */}
              {/* <Leave /> */}
              {/* <JobHistory /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
