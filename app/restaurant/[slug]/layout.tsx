import React from "react";
import Header from "./components/Header";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import { notFound } from "next/navigation";
import { prisma } from "../../../utils/prisma";

interface Restaurant {
  slug: string;
  open_time: string;
  close_time: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      slug: true,
      open_time: true,
      close_time: true
    }
  });
  if (!restaurant) {
    throw notFound();
  }
  return restaurant;
}

const RestaurantLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string }
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <main>
      <Header slug={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavbar slug={params.slug} />
          {children}
        </div>
        {/* RESERVATION CARD PORTION */}
        <div className="w-[27%] relative text-reg">
          <ReservationCard
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={restaurant.slug} />
        </div>
      </div>
    </main>
  );
};

export default RestaurantLayout;
