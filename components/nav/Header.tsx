import React from "react";
import DropdownUser from "@/components/Dropdown";
import { useAuth } from "@/context/AuthProvider";
type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { employeeData } = useAuth();
  return (
    <header
      className={`bg-white h-[70px] z-10 transition-all duration-300 ease-in-out fixed w-full ${
        sidebarOpen ? "lg:left-[70px]" : "lg:left-[230px]"
      } top-0 flex items-center justify-between shadow-md px-6`}
      style={{
        left: sidebarOpen ? "70px" : "230px",
        width: sidebarOpen ? "calc(100% - 70px)" : "calc(100% - 230px)",
      }}
    >
      {/* Sidebar Toggle Button */}
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="cursor-pointer"
      >
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </div>

      {/* Header Title or Content */}
      <div className="flex gap-3 lg:gap-10 items-center">
        <div className="border-l pl-2 md:pl-4">
          <DropdownUser
            name={employeeData?.name}
            role={employeeData?.title}
            image={employeeData?.image}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
