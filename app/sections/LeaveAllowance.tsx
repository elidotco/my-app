import LeaveCard from "@/components/cards/LeaveCard";
import { createClient } from "@/utils/supabase/client";

import React, { useEffect, useState } from "react";

interface Data {
  leave_type_id: {
    name: string;
    is_paid: boolean;
    allowance: number;
  };
  taken: number;
  available: number;
}

const LeaveAllowance = ({ id }: { id: string }) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("employee_leave_balances")
        .select(
          `leave_type_id(
          name,
          is_paid,
          allowance
         ),
          taken, available `
        )
        .eq("employee_id", id);

      if (error) {
        console.log("Error fetching", error.message);
      }
      setData((data as unknown as Data[]) || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  console.log(data);

  return (
    <>
      <div className="w-full flex j flex-wrap gap-[2%] -gap-y-5 py-24 px-10  h-full">
        {data?.map((item, index) => {
          return <LeaveCard data={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default LeaveAllowance;
