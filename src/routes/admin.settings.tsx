import { createFileRoute } from "@tanstack/react-router";
import { AdminSettingsPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });