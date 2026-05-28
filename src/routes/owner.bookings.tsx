import { createFileRoute } from "@tanstack/react-router";
import { OwnerBookingsPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/owner/bookings")({ component: OwnerBookingsPage });