import { PrismaClient, Item } from "@prisma/client";
import React from "react";
import Menu from "../components/Menu";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      item: true,
    }
  });

  if (!restaurant) {
    throw notFound();
  }
  return restaurant.item
}

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchRestaurantMenu(params.slug);
  return (
    <Menu menu={menu} />
  );
};

export default RestaurantMenu;
