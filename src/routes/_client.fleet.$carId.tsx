import { createFileRoute, notFound } from "@tanstack/react-router";
import { CarDetailPage } from "@/pages/client/CarDetailPage";
import { getCar } from "@/lib/mock-data";

export const Route = createFileRoute("/_client/fleet/$carId")({
  loader: ({ params }) => {
    const car = getCar(params.carId);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.car.make} ${loaderData.car.model} — Arrivée` },
      { name: "description", content: `Book the ${loaderData.car.year} ${loaderData.car.make} ${loaderData.car.model} with its dedicated chauffeur.` },
      { property: "og:image", content: loaderData.car.images[0] },
    ] : [],
  }),
  component: CarDetailPage,
});