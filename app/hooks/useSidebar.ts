// useSidebar.ts
import { useState } from "react";

export const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return { sidebarOpen, toggleSidebar };
};
