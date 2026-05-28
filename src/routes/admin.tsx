import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LayoutDashboard, Users, Building2, Car, Calendar, Settings } from "lucide-react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/owners", label: "Owners", icon: Building2 },
  { to: "/admin/vehicles", label: "Vehicles", icon: Car },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export const Route = createFileRoute("/admin")({
  component: () => (
    <DashboardLayout brand="ARRIVÉE." subtitle="Admin Console" nav={[...nav]} userName="Sofia Admin" userRole="Platform Admin">
      <Outlet />
    </DashboardLayout>
  ),
});