import { createFileRoute } from "@tanstack/react-router";
import { OwnerDriversPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/owner/drivers")({ component: OwnerDriversPage });