"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Define navigation items based on roles
const navigationConfig = {
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: "HomeIcon" },
    { name: "Users", href: "/users", icon: "UsersIcon" },
    { name: "Settings", href: "/settings", icon: "CogIcon" },
  ],
  user: [
    { name: "Dashboard", href: "/dashboard", icon: "HomeIcon" },
    { name: "Profile", href: "/profile", icon: "UserIcon" },
  ],
  // Add more role-based navigation
};

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await fetch("/api/user-role");
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.log("Error fetching user role:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRole();
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  const navigationItems = role
    ? navigationConfig[role as keyof typeof navigationConfig]
    : [];

  return (
    <nav className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="space-y-4">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
