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

type Props = {
  params?: {
    slug?: string;
  };
  searchParams?: {
    date?: string;
    partySize?: string;
  };
};

export default async function Reserve(props: Props) {
  const { params, searchParams } = props;
  const { slug } = params || {};
  const { date, partySize } = searchParams || {};

  if (slug && date && partySize) {
    const restaurant = await fetchRestaurantBySlug(slug)
    return (
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header
            image={restaurant.main_image}
            name={restaurant.name}
            date={date}
            partySize={partySize} />
          <Form
            slug={slug}
            date={date}
            partySize={partySize} />
        </div>
      </div>
    );
  }
  else {
    return notFound()
  }
};

export const dynamic = 'force-dynamic'
