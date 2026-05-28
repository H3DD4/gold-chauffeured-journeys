import { createFileRoute } from "@tanstack/react-router";
import { AdminVehiclesPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/vehicles")({ component: AdminVehiclesPage });