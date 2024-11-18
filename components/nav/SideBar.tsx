import React, { useState } from "react";
import { LuPieChart } from "react-icons/lu";
import { FiUser, FiUsers } from "react-icons/fi";
import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  Cog8ToothIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
  subs?: { name: string; path: string }[];
}

interface SideBarProps {
  sidebarOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ sidebarOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navdata: NavItem[] = [
    {
      name: "Dashboard",
      icon: LuPieChart,
      path: "/dashboard",
    },
    {
      name: "Job Desk",
      icon: FiUser,
      path: "/employee",
    },
    {
      name: "Employee",
      icon: FiUsers,
      path: "#",
      subs: [
        {
          name: "All Employees",
          path: "/employee/lists",
        },
        {
          name: "Designation",
          path: "/employee/designation",
        },
        {
          name: "Employment Status",
          path: "/employee/employment-statuses",
        },
      ],
    },
    {
      name: "Leave",
      icon: ClockIcon,
      path: "#",
      subs: [
        {
          name: "Leave Status",
          path: "/leave/statuses",
        },
        {
          name: "Leave Request",
          path: "/leave/request",
        },
        {
          name: "Calendar",
          path: "/calendar",
        },
        {
          name: "Summary",
          path: "/summary",
        },
      ],
    },
    {
      name: "Attendance",
      icon: CalendarIcon,
      path: "#",
      subs: [
        {
          name: "Daily Log",
          path: "/attendance/list",
        },
        {
          name: "Attendance Request",
          path: "/attendance/request",
        },
        {
          name: "Attendance Details",
          path: "/attendance/details",
        },
        {
          name: "Summary",
          path: "/attendances/summary",
        },
      ],
    },
    {
      name: "Payroll",
      icon: CreditCardIcon,
      path: "#",
      subs: [
        {
          name: "Pay Run",
          path: "/payroll/runrun",
        },
        {
          name: "Pay Slip",
          path: "/payroll/payslip",
        },
        {
          name: "Summary",
          path: "/payroll/summary",
        },
        {
          name: "Beneficiary Badge",
          path: "/payrolls/beneficiary-badges",
        },
      ],
    },
    {
      name: "Administration",
      icon: BriefcaseIcon,
      path: "#",
      subs: [
        {
          name: "Users & Roles",
          path: "/administration/users",
        },
        {
          name: "Work Shifts",
          path: "/administration/work-shifts",
        },
        {
          name: "Department",
          path: "/administration/department",
        },
        {
          name: "Holiday",
          path: "/administration/holiday",
        },
        {
          name: "Org. Structure",
          path: "/administration/org-structure",
        },
        {
          name: "Announcement",
          path: "/administration/announcement",
        },
      ],
    },
    {
      name: "Settings",
      icon: Cog8ToothIcon,
      path: "#",
      subs: [
        {
          name: "App settings",
          path: "/settings/app",
        },
        {
          name: "Leave Settings",
          path: "/settings/leave",
        },
        {
          name: "Attendance",
          path: "/settings/attendance",
        },
        {
          name: "Holiday",
          path: "/settings/holiday",
        },
        {
          name: "Payroll",
          path: "/settings/payroll",
        },
      ],
    },
  ];

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownId ? null : dropdownId
    );
    if (sidebarOpen) {
      setActiveDropdown(null);
    }
  };

  return (
    <aside
      className={`bg-sidebar_color z-99 transition-all duration-300 ease-in-out text-white h-screen fixed  top-0 left-0 ${
        sidebarOpen ? "w-[68px]" : "w-[230px]"
      }`}
    >
      <div
        className={`${
          sidebarOpen ? "w-[68px]" : "w-[230px]"
        } transition-all duration-300 ease-in-out bg-primesidecolor h-[70px]`}
      >
        <h1>HOURS</h1>
      </div>
      <ul
        className={`mt-4 flex ${
          sidebarOpen ? "" : ""
        } min-h-screen overflow-visible flex-col`}
      >
        {navdata.map((nav) => {
          if (nav.subs) {
            return (
              <li key={nav.name} className="py-2 relative group">
                <div className="flex flex-col gap-3">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleDropdown(nav.name)}
                  >
                    <div
                      className={`p-[10px] bg-primesidecolor text-opacity-80 group-hover:text-[#ff5714] ${
                        activeDropdown === nav.name ? "text-[#ff5714]" : ""
                      } rounded-[3px] ${
                        sidebarOpen ? "mx-auto" : "ml-3"
                      } text-[#707887]`}
                    >
                      <nav.icon className="w-5 h-5" size={18} />
                    </div>
                    <p
                      className={`${
                        sidebarOpen
                          ? "hidden group-hover:flex hover:flex absolute left-[100%] rounded-[3px] bg-sidebar_color p-4 w-[14rem] transition duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto font-light group-hover:text-[#109aff]"
                          : ""
                      } group-hover:text-[#ff5714] ${
                        activeDropdown === nav.name
                          ? "text-[#ff5714]"
                          : "text-[#707887]"
                      } pl-2`}
                    >
                      {nav.name}
                    </p>
                  </div>

                  {/* Dropdown Menu */}
                  <ul
                    className={`${
                      activeDropdown === nav.name ? "flex" : "hidden"
                    } flex-col text-sm rounded-[3px] p-4 transition duration-300 ease-in-out pl-12 ${
                      sidebarOpen
                        ? "hidden group-hover:flex hover:flex absolute top-12 left-[100%] rounded-[3px] bg-sidebar_color p-4 w-[14rem] transition duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto"
                        : "bg-primesidecolor w-full"
                    }`}
                  >
                    {nav.subs.map((item) => (
                      <Link key={item.name} href={item.path}>
                        <li className="p-1 text-gray-300 hover:text-blue-300 cursor-pointer rounded">
                          {item.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </li>
            );
          } else {
            return (
              <li key={nav.name} className="py-2 relative group">
                <Link href={nav.path}>
                  <div className="flex items-center   gap-3">
                    <div
                      className={`p-[10px] ${
                        pathname.includes(nav.path)
                          ? "bg-[#ff5714] text-white"
                          : "bg-primesidecolor text-[#707887] group-hover:text-[#ff5714]"
                      } rounded-[3px] ${sidebarOpen ? "mx-auto" : "ml-3"}`}
                    >
                      <nav.icon className="w-5 h-5" size={18} />
                    </div>
                    <p
                      className={`${
                        sidebarOpen
                          ? "hidden group-hover:flex group-hover:text-[#ff5714] hover:flex absolute left-[100%] rounded-r-[3px] bg-sidebar_color p-4 w-[12rem] transition duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto"
                          : ""
                      } ${
                        pathname.includes(nav.path)
                          ? "text-white"
                          : "text-[#707887] group-hover:text-[#109aff]"
                      }`}
                    >
                      {nav.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
