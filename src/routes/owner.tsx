import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LayoutDashboard, Car, Calendar, Users, Wallet, Plus } from "lucide-react";

const nav = [
  { to: "/owner", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/owner/fleet", label: "My Fleet", icon: Car },
  { to: "/owner/fleet/new", label: "Add Vehicle", icon: Plus },
  { to: "/owner/bookings", label: "Bookings", icon: Calendar },
  { to: "/owner/drivers", label: "Drivers", icon: Users },
  { to: "/owner/earnings", label: "Earnings", icon: Wallet },
] as const;

export const Route = createFileRoute("/owner")({
  component: () => (
    <DashboardLayout brand="ARRIVÉE." subtitle="Owner Console" nav={[...nav]} userName="Marcus Beaumont" userRole="Fleet Owner">
      <Outlet />
    </DashboardLayout>
  ),
});