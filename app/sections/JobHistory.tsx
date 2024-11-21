import React from "react";
import { FaBuilding, FaClock, FaUserTie, FaUserCheck } from "react-icons/fa";
import { PiBuildingLight } from "react-icons/pi";

const JobHistory = () => {
  return (
    <div className=" w-full h-full">
      <div className="w-full p-10 h-[13%]  border-b">
        <p className="text-2xl font-medium">Job History</p>
      </div>
      <div className="flex flex-col space-y-8 w-full p-8 rounded-md ">
        {/* Department Section */}
        <div className="flex  space-x-4">
          <div className="flex  flex-col  items-center">
            <h3 className="font-semibold">Department</h3>
          </div>
          <div className="p-3 mb-27 relative bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-[1px] h-27 bg-gray-100 absolute -bottom-[230%]"></div>
            <PiBuildingLight size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="">
              <p className="text-gray-500 text-sm">Main Department</p>
              <p className="text-gray-400 text-sm">Today - Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHistory;
