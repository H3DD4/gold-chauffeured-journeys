import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/pages/client/AuthPage";

export const Route = createFileRoute("/_client/register")({
  head: () => ({ meta: [{ title: "Create Account — Arrivée" }] }),
  component: () => <AuthPage mode="register" />,
});