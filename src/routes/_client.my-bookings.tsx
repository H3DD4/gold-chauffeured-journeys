import { createFileRoute } from "@tanstack/react-router";
import { MyBookingsPage } from "@/pages/client/MyBookingsPage";

export const Route = createFileRoute("/_client/my-bookings")({
  head: () => ({ meta: [{ title: "My Rides — Arrivée" }] }),
  component: MyBookingsPage,
});