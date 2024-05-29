"use client";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchForRestaurants } from "../_actions/search";
import { Separator } from "@/app/_components/ui/separator";
import { Card } from "@/app/_components/ui/card";
import { Soup } from "lucide-react";

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
      <Header haveSearchBar={true} />

      <Separator />

      <div className="px-5 py-6 md:px-24">
        <h2 className=" mb-6 text-lg font-semibold">
          Restaurantes Encontrados
        </h2>

        <div className="flex w-full grid-cols-2 flex-col gap-6 md:grid lg:grid-cols-4">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantItem
                userFavoriteRestaurants={userFavoriteRestaurants}
                key={restaurant.id}
                restaurant={JSON.parse(JSON.stringify(restaurant))}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <Card className="flex flex-col items-center gap-5 overflow-hidden text-ellipsis p-4 text-center shadow-lg md:min-w-96 md:flex-row-reverse md:text-left">
              <h3 className="font-medium">Nenhum resultado para:{searchFor}</h3>

              <Soup className="size-32 text-primary" />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
