import { createFileRoute } from "@tanstack/react-router";
import { ClientLayout } from "@/components/layouts/ClientLayout";

export const Route = createFileRoute("/_client")({
  component: ClientLayout,
});