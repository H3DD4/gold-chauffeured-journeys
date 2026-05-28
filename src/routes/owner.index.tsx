import { createFileRoute } from "@tanstack/react-router";
import { OwnerDashboard } from "@/pages/dashboard/OwnerDashboard";
export const Route = createFileRoute("/owner/")({ component: OwnerDashboard });