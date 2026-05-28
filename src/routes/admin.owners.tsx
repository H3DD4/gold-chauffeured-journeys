import { createFileRoute } from "@tanstack/react-router";
import { AdminOwnersPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/owners")({ component: AdminOwnersPage });