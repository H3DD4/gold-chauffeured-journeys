import { createFileRoute } from "@tanstack/react-router";
import { FleetPage } from "@/pages/client/FleetPage";

export const Route = createFileRoute("/_client/fleet")({
  head: () => ({
    meta: [
      { title: "The Fleet — Arrivée" },
      { name: "description", content: "Explore our hand-picked fleet of chauffeured limousines, sedans, SUVs and vans across Europe and beyond." },
    ],
  }),
  component: FleetPage,
});