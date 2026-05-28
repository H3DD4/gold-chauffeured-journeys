import { createFileRoute } from "@tanstack/react-router";
import { OwnerFleetPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/owner/fleet")({ component: OwnerFleetPage });