import { createFileRoute } from "@tanstack/react-router";
import { BookingFlow } from "@/pages/client/BookingFlow";

export const Route = createFileRoute("/_client/booking")({
  head: () => ({ meta: [{ title: "Reserve — Arrivée" }, { name: "description", content: "Reserve your chauffeured arrival." }] }),
  component: BookingFlow,
});