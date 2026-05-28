import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/users")({ component: AdminUsersPage });