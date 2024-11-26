"use client";

import JobHistory from "@/app/sections/JobHistory";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  PiCalendarBlankThin,
  PiClockAfternoonThin,
  PiSuitcaseLight,
  PiTagThin,
} from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import Tab from "@/components/Tab";

interface Data {
  name: string;
  department: string;
  employment_status: string;
  image: string;
  employeeid: string;
  role: string;
  designation: string;
  schedule: string;
  title: string;
}

export default function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();

  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  const filters = use(searchParams);
  const id = use(params).id;
  const fullUrl = `${pathname}?tab=hello world`;
  const tab = (filters.tab as string).split(" ");
  const supabase = createClient();
  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log("Error fetching", error.message);
      }
      setData(data || []);
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
    <div className="pt-20">
      Helllo
      <Link href={fullUrl}>next</Link>
      <>
        <p className="text-2xl font-medium mb-5 px-10">Job Desk</p>
        <div className="flex justify-between py-10  px-20 items-center w-full bg-white shadow rounded-md">
          <div
            className={`w-full h-full flex justify-between transition-all duration-100 items-center ${loading ? "invisible duration-100 items-center " : "duration-100 items-center "}`}
          >
            {/* USer Profile */}
            <div className="flex justify-between gap-x-20 items-center">
              <div className="w-36 h-36 bg-green-300 rounded-full"></div>
              <div className="flex flex-col item-center">
                <h3 className="text-2xl text-medium">{data?.name}</h3>
                <p
                  className={`px-5 py-1 mb-2 text-white rounded-full text-sm bg-${data?.employment_status === "Permanent" ? "blue" : data?.employment_status === "Probation" ? "orange" : "red"}-500`}
                >
                  {data?.employment_status}
                </p>
                <p className="text-sm text-light text-gray-500">
                  Emp {data?.employeeid}
                </p>
                <p className="text-sm text-light text-gray-500">{data?.role}</p>
              </div>
            </div>
            {/* USer Profile */}

            <div className="flex justify-between flex-col gap-10 px-5 border-l">
              <div className="flex items-center gap-2">
                <PiSuitcaseLight size={35} className="text-orange-400" />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm">Department</p>
                  <p className=" text-sm">{data?.department} Department</p>
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
                  <p className=" text-sm">{data?.title}</p>
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
        </div>
        <Tab param={tab} id={id} />
      </>
    </div>
  );
}
