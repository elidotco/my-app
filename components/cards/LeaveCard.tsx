import React from "react";
interface Data {
  leave_type_id: {
    name: string;
    is_paid: boolean;

    allowance: number;
  };
  taken: number;
  available: number;
}

const LeaveCard = ({ data }: { data: Data }) => {
  console.log(data);
  return (
    <div className="2xl:w-[23%] xl:w-[31%] h-fit py-5 rounded-xl bg-gray-50">
      <div className="py-7 text-left border-b capitalize px-7">
        {data?.leave_type_id.name}
      </div>
      <div className="px-7 flex flex-col gap-2 text-gray-400 py-5">
        <p>
          Type:{" "}
          <span className="text-black">
            {data.leave_type_id.is_paid ? "Paid" : "Unpaid"}
          </span>
        </p>
        <p>
          Allowance:
          <span className="text-black"> {data.leave_type_id.allowance}</span>
        </p>
        <p>
          Earned: <span className="text-black">{null}</span>
        </p>
        <p>
          Taken: <span className="text-black">{data.taken}</span>
        </p>
        <p>
          Availability:{" "}
          <span className="text-black">
            {data.leave_type_id.allowance - data.taken}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LeaveCard;
