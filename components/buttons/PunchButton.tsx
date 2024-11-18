"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/context/AuthProvider";

const PunchInOutButton = () => {
  const [loading, setLoading] = useState(false);
  const [isPunchInMode, setIsPunchInMode] = useState(true); // Track punch-in or punch-out mode
  const supabase = createClient();
  const { employeeData } = useAuth();
  console.log(employeeData);

  // Check if there's an existing punch-in without a punch-out
  const checkOpenPunchIn = async () => {
    if (!employeeData) return null;
    const today = dayjs().format("YYYY-MM-DD");
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("date", today)
      .eq("employeeid", employeeData.employeeid)
      .is("punchout", null)
      .order("punchin", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error checking open punch-in:", error.message);
      return null;
    }

    return data.length > 0 ? data[0] : null; // Return the first open record
  };

  // Handle punch-in functionality
  const handlePunchIn = async () => {
    setLoading(true);

    if (!employeeData) {
      console.error("No user is logged in.");
      setLoading(false);
      return;
    }

    const punchInTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const today = dayjs().format("YYYY-MM-DD");

    // Check for an open punch-in
    const openPunchIn = await checkOpenPunchIn();

    if (openPunchIn) {
      console.error("You have already punched in without punching out.");
      setLoading(false);
      return;
    }

    // Insert a new record with the punch-in time
    const { data, error } = await supabase.from("attendance").insert([
      {
        employeeid: employeeData.employeeid,
        punchin: punchInTime,
        date: today,
      },
    ]);

    if (error) {
      console.error("Error during punch-in:", error.message);
    } else {
      console.log("Punch-in recorded:", data);
      setIsPunchInMode(false); // Switch to punch-out mode after punching in
    }

    setLoading(false);
  };

  // Handle punch-out functionality
  const handlePunchOut = async () => {
    setLoading(true);

    if (!employeeData) {
      console.error("No user is logged in.");
      setLoading(false);
      return;
    }

    const punchOutTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // Check for an open punch-in
    const openPunchIn = await checkOpenPunchIn();
    console.log(openPunchIn);

    if (!openPunchIn) {
      console.error("No open punch-in found to punch out.");
      setLoading(false);
      return;
    }

    // Update the record with the punch-out time
    const { data, error } = await supabase
      .from("attendance")
      .update({ punchout: punchOutTime })
      .eq("attendanceid", openPunchIn.attendanceid);

    if (error) {
      console.error("Error during punch-out:", error.message);
    } else {
      console.log("Punch-out recorded:", data);
      setIsPunchInMode(true); // Switch back to punch-in mode after punching out
    }

    setLoading(false);
  };
  useEffect(() => {
    checkOpenPunchIn().then((result) => {
      result?.punchin ? setIsPunchInMode(false) : setIsPunchInMode(true);
    });
  }, [employeeData]);

  return (
    <div className="punch-in-out-container">
      {isPunchInMode ? (
        <button
          onClick={handlePunchIn}
          className="punch-in-button bg-green-400 text-white px-4 py-2 rounded-sm"
          disabled={loading}
        >
          {loading ? "Punching in..." : "Punch In"}
        </button>
      ) : (
        <button
          onClick={handlePunchOut}
          className="punch-out-button bg-red-500 text-white px-4 py-2 rounded-sm"
          disabled={loading}
        >
          {loading ? "Punching out..." : "Punch Out"}
        </button>
      )}
    </div>
  );
};

export default PunchInOutButton;
