import { createFileRoute } from "@tanstack/react-router";
import { OwnerEarningsPage } from "@/pages/dashboard/SimplePage";
export const Route = createFileRoute("/owner/earnings")({ component: OwnerEarningsPage });