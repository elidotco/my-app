import React from "react";

interface StatsCardProps {
  Icons: React.ComponentType<{ size: number; className: string }>;
  num: number | string;
  name: string;
}

const StatsCard = ({ Icons, num, name }: StatsCardProps) => {
  return (
    <div className="w-full md:w-[23%] bg-[#fff]  shadow-sm shadow-gray-400 rounded-[4px]  py-7 flex items-center justify-center ">
      {/* Icon */}
      <div className="p-3 bg-[#ff5714] text-white">
        <Icons size={20} className="w-6 h-6" />
      </div>
      {/* Icon */}
      <div className="flex pl-3 flex-col">
        <p className="text-sm">{num}</p>
        <p className="text-[10px]">{name}</p>
      </div>
    </div>
  );
};

export default StatsCard;
