import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/pages/client/AuthPage";

export const Route = createFileRoute("/_client/login")({
  head: () => ({ meta: [{ title: "Sign In — Arrivée" }] }),
  component: () => <AuthPage mode="login" />,
});