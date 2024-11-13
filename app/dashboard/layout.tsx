import { AuthProvider } from "@/context/AuthProvider";

// create as imple layout for dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
