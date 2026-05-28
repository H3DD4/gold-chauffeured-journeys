import { createFileRoute } from "@tanstack/react-router";
import { OwnerAddVehiclePage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/owner/fleet/new")({ component: OwnerAddVehiclePage });