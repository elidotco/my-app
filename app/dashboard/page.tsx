"use client";
import { useAuth } from "@/context/AuthProvider";
import React from "react";

const Home = () => {
  const { user, employeeData } = useAuth();
  console.log(user);
  console.log(employeeData);
  return (
    <div>
      Hello World
      {user?.email}
      {employeeData?.email}
    </div>
  );
};

export default Home;
