import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient();

export interface Restaurant {
  main_image: string;
  name: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      main_image: true,
      name: true,
    }
  })

  if (!restaurant) {
    notFound()
  }

  return restaurant
}

const Reserve = async ({ params, searchParams }: {
  params: { slug: string; }
  searchParams: { date: string; partySize: string; }
}) => {
  console.info(`date ${searchParams.date} in reserve page`)
  const restaurant = await fetchRestaurantBySlug(params.slug)
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize} />
        <Form
          slug={params.slug}
          date={searchParams.date}
          partySize={searchParams.partySize} />
      </div>
    </div>
  );
};

export default Reserve;
