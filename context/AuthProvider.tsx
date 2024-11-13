// src/context/AuthProvider.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

interface Employee {
  id: number;
  email: string;
  name?: string;
  role?: string;
}

interface Attendance {
  id: number;
  employee_id: number;
  check_in: string;
  check_out: string | null;
  date: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  employeeData: Employee | null;
  attendanceData: Attendance[];
  fetchAttendanceData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const fetchEmployeeData = async (email: string) => {
    const { data: employee, error } = await supabase
      .from("employees")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching employee data:", error);
      setEmployeeData(null);
    } else if (employee) {
      setEmployeeData(employee);
    } else {
      console.log(`No employee found for email: ${email}`);
      setEmployeeData(null);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const { data: attendance, error } = await supabase
        .from("attendance")
        .select(
          `
          *,
          employee:employees(name, email)
        `
        )
        .order("date", { ascending: false })
        .order("check_in", { ascending: false });

      if (error) throw error;

      setAttendanceData(attendance || []);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setAttendanceData([]);
    }
  };

  useEffect(() => {
    const fetchUserAndEmployeeData = async () => {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        if (user.email) {
          await fetchEmployeeData(user.email);
        }
      } else if (error) {
        console.error("Error fetching user:", error);
      }

      if (!user && pathname !== "/" && !pathname.includes("/sign-in")) {
        router.push("/sign-in");
      }

      setLoading(false);
    };

    fetchUserAndEmployeeData();
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user ?? null);
        if (session?.user?.email) {
          await fetchEmployeeData(session.user.email);
        } else {
          setEmployeeData({ id: 0, email: "NOT FOUND" });
        }
      }
    );

    return () => subscription.subscription?.unsubscribe();
  }, [supabase, pathname, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        employeeData,
        attendanceData,
        fetchAttendanceData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
