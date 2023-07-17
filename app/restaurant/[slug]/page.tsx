import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true
    }
  });
  if (!restaurant) {
    throw notFound();
  }
  return restaurant;
}

const RestaurantPage = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <Title name={restaurant.name} />
      <Rating reviews={restaurant.reviews} />
      <Description description={restaurant.description} />
      <Images images={restaurant.images} />
      <Reviews reviews={restaurant.reviews} />
    </>
  );
};

export default RestaurantPage;
