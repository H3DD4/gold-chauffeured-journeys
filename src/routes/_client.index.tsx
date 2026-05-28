import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/client/LandingPage";

export const Route = createFileRoute("/_client/")({
  head: () => ({
    meta: [
      { title: "Arrivée — Chauffeured Luxury Arrivals" },
      { name: "description", content: "Private chauffeured car service for galas, transfers, weddings and executives. Arrive in silence. Leave an impression." },
      { property: "og:title", content: "Arrivée — Chauffeured Luxury Arrivals" },
      { property: "og:description", content: "Private chauffeured car service for the world's most discerning clients." },
    ],
  }),
  component: LandingPage,
});