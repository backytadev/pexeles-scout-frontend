import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth/auth.store";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardLayout() {
  const authStatus = useAuthStore((state) => state.status);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const loginUser = useAuthStore((state) => state.loginUser);

  if (authStatus === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }

  if (authStatus === "pending") {
    loginUser("", "");
  }

  return (
    <SidebarProvider>
      <AppSidebar logoutUser={logoutUser} />
      <main className="w-full">
        <SidebarTrigger className="h-10 w-10 text-xl" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
