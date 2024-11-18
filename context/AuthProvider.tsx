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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  employeeData: any | null; // Define the type for employee data as per your schema
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [employeeData, setEmployeeData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const loadingPromise = new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

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

      await loadingPromise;
      setLoading(false);
    };

    const fetchEmployeeData = async (email: string | null) => {
      if (!email) return;
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Error fetching employee data:", error);
      } else {
        setEmployeeData(data);
        setLoading(false);
      }
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser?.email) {
          fetchEmployeeData(currentUser.email);
        } else {
          setEmployeeData(null);
        }
      }
    );
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [supabase, pathname, router]);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, employeeData }}
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
