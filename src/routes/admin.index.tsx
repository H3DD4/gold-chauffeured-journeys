import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/")({ component: AdminDashboard });