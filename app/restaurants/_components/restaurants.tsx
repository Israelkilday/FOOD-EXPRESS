"use client";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchForRestaurants } from "../_actions/search";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchResturants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await SearchForRestaurants(searchFor);

      setRestaurants(foundRestaurants);
    };

    fetchResturants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className=" mb-6 text-lg font-semibold">
          Restaurantes Encontrados
        </h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userFavoriteRestaurants={userFavoriteRestaurants}
              key={restaurant.id}
              // restaurant={restaurant}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
