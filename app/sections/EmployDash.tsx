import React, { useEffect, useState } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/context/AuthProvider";
import Loader from "@/components/Loader";

const EmployDash = ({ name }: { name: string }) => {
  const { employeeData } = useAuth();
  const supabase = createClient();
  const [timeLogs, setTimeLogs] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader
  const [realTimeSubscription, setRealTimeSubscription] =
    useState<RealtimeChannel | null>(null); // For real-time updates
  const today = dayjs().format("YYYY-MM-DD");
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm"));

  // Fetch time logs from Supabase
  const fetchTimeLogs = async () => {
    if (!employeeData) return;

    try {
      setLoading(true); // Show loader while fetching
      const { data, error } = await supabase
        .from("attendance")
        .select("punchin, punchout")
        .eq("employeeid", employeeData.employeeid)
        .eq("date", today)
        .order("punchin", { ascending: false });

      if (error) {
        console.error("Error fetching time logs:", error.message);
        return;
      }

      setTimeLogs(data as any[]); // Update logs
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };

  // Updated subscription setup
  const setupRealTimeSubscription = () => {
    if (!employeeData) return;

    const subscription = supabase
      .channel(`attendance_changes_${employeeData.employeeid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "attendance",
          filter: `employeeid=eq.${employeeData.employeeid}`,
        },
        (payload) => {
          console.log("Attendance updated:", payload);
          fetchTimeLogs();
        }
      )
      .subscribe();

    setRealTimeSubscription(subscription);
  };

  // Updated cleanup function
  const cleanUpSubscription = async () => {
    if (realTimeSubscription) {
      await supabase.removeChannel(realTimeSubscription);
      setRealTimeSubscription(null);
    }
  };

  // Updated useEffect
  useEffect(() => {
    if (employeeData) {
      fetchTimeLogs();
      setupRealTimeSubscription();
    }

    return () => {
      cleanUpSubscription();
    };
  }, [employeeData]);

  // Add this useEffect for real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10 lg:flex-row justify-between">
        {/* Left Side: Greeting and Punch Information */}
        <div className="lg:w-[70%] w-full flex flex-col">
          <div className="relative w-full bg-white p-6 rounded-sm shadow-md mb-6 lg:mb-0">
            {loading && <Loader />} {/* Show Loader when loading */}
            {!loading && (
              <>
                <h1 className="text-xl ">
                  Good Afternoon, <span className="font-medium"> {name} </span>.
                </h1>
                <p className="text-gray-500 mt-1">
                  It's <span className="font-bold text-2xl">{currentTime}</span>{" "}
                  (Europe/London)
                </p>
                <p className="text-red-500 mt-2">
                  You are 3 hours and 6 minutes late!
                </p>

                <div className="flex space-x-10 mt-6">
                  {timeLogs.length > 0 ? (
                    <>
                      <div className="flex items-center">
                        <div className="flex justify-center rounded-full bg-gray-100 items-center p-5">
                          <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="ml-2 text-center">
                          <p className="text-sm text-gray-600">
                            {timeLogs[0]?.punchin || "N/A"}
                          </p>
                          <p className="text-sm font-semibold">Punch in time</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex justify-center rounded-full bg-gray-100 items-center p-5">
                          <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="ml-2 text-center">
                          <p className="text-sm text-gray-600">
                            {timeLogs[0]?.punchout || "N/A"}
                          </p>
                          <p className="text-sm font-semibold">
                            Punch out time
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-xl">You are yet to Punch in Today</p>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Leave Information */}
          <div className="flex w-full flex-wrap justify-between gap-y-5 mt-6">
            {/* Leave Information Cards */}
            {/* Repeat card design as in the original code */}
            <div className="bg-white p-4  w-[49%] pl-10 rounded-sm shadow-md">
              <p className="text-lg font-light">33</p>
              <p className="text-gray-600">Total leave allowance</p>
              <div className="flex mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  Paid - 19
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  Unpaid - 14
                </div>
              </div>
            </div>

            <div className="bg-white p-4 w-[49%] pl-10 rounded-sm shadow-md">
              <p className="text-lg font-light">33</p>
              <p className="text-gray-600">Total leave available</p>
              <div className="flex mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  Paid - 19
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  Unpaid - 14
                </div>
              </div>
            </div>

            <div className="bg-white p-4  w-[49%] pl-10 rounded-sm shadow-md">
              <p className="text-lg font-light">0</p>
              <p className="text-gray-600">Total leave taken</p>
              <div className="flex mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  Paid - 0
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  Unpaid - 0
                </div>
              </div>
            </div>

            <div className="bg-white w-[49%]  p-4 pl-10 rounded-sm shadow-md">
              <p className="text-lg font-light">0</p>
              <p className="text-gray-600">Leave request pending</p>
              <div className="flex mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  Paid - 0
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  Unpaid - 0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Time Log */}
        <div className="lg:w-[29%] w-full bg-white rounded-sm shadow-md">
          <div className="border-b py-6 px-6">
            <h2 className="text-lg font-semibold">Time Log</h2>
          </div>
          <div className="mt-4 mx-6">
            <div className="border-b pt-5">
              <p className="text-gray-600">Today</p>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <p>08:00 Scheduled</p>
              <p>06:00 Worked</p>
              <p>00:00 Break</p>
              <p>-2:00 Balance</p>
            </div>
          </div>
          <div className="mt-6 mx-6">
            <div className="border-b px-6">
              {" "}
              <p className="text-gray-600">This month</p>
            </div>
            <div className="mt-2 pb-5 flex items-center">
              <div className="flex justify-center rounded-sm mr-2 items-center p-3 bg-[#ff5714]">
                <ClockIcon className="w-6 h-6 text-slate-50" />
              </div>
              <div className="flex flex-col text-left">
                <p className=" text-xl">176 h</p>
                <p className="text-gray-500">Total schedule time</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Worked time - 218 h</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-[#ff5714] h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Shortage time - 0 m</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1"></div>
              <p className="text-sm text-gray-600 mt-2">Over time - 50 h</p>
              <div
                className="w-full bg-[#ff5714] rounded-full h-2 mt-1"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className=" pt-20 flex w-full min-h-screen">
        {/* <Table columns={columns} data={[]} /> */}
      </div>
      {/* Additional Time Log Details */}
    </div>
  );
};

export default EmployDash;