import { Cuisine, PRICE, Location } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import { RestaurantCardType } from "../page";
import { prisma } from "../../utils/prisma";

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantsByLocation = async (searchParams: SearchParams): Promise<RestaurantCardType[]> => {
  const where: any = {};
  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.trim().toLowerCase()
      }
    }
    where.location = location
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.trim().toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price
  }

  const restaurants = await prisma.restaurant.findMany({
    where: where,
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  if (!restaurants) throw new Error;
  return restaurants;
}

const fetchAllLocations = async (): Promise<Location[]> => {
  const locationList = await prisma.location.findMany();
  return locationList;
}

const fetchAllCusinies = async (): Promise<Cuisine[]> => {
  const cusinieList = await prisma.cuisine.findMany();
  return cusinieList;
}

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locationList = await fetchAllLocations();
  const cuisineList = await fetchAllCusinies();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locationList={locationList}
          cuisineList={cuisineList}
          searchParams={searchParams} />
        <div className="w-5/6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurantCard={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
