import React from "react";

const ProgressBar = ({
  workedPercentage,
  shortage,
}: {
  workedPercentage: any;
  shortage: number;
}) => {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">Worked time - 218 h</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
        <div
          className="bg-[#ff5714] h-2 rounded-full"
          style={{ width: `${workedPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Shortage time - 0 m</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
        <div
          className="w-full bg-[#ff5714] rounded-full h-2 mt-1"
          style={{ width: `${shortage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Over time - 50 h</p>
      <div
        className="w-full bg-[#ff5714] rounded-full h-2 mt-1"
        style={{ width: "25%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
