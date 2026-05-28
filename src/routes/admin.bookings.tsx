import { createFileRoute } from "@tanstack/react-router";
import { AdminBookingsPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/bookings")({ component: AdminBookingsPage });