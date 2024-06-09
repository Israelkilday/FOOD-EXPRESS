"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();
  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return;

    try {
      await toggleFavoriteRestaurant(data.user.id, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos"
          : "Restaurant favoritado!",
      );
    } catch (error) {
      toast.error("Error ao favoritar Reataurant.");
    }
  };

  return (
    <div
      className={cn(
        "min-w-[266px] max-w-[266px] lg:min-w-[277px] lg:max-w-[277px]",
        className,
      )}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full lg:h-48">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className=" rounded-lg object-cover"
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />

            <span className="text-xs font-semibold">5.0</span>
          </div>
          {data?.user.id && (
            <Button
              size="icon"
              onClick={handleFavoriteClick}
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary lg:size-4" size={14} />

              <span className="text-xs text-muted-foreground lg:font-semibold">
                {Number(restaurant.deliveryFree) === 0
                  ? "Entrega Gratis!"
                  : formatCurrency(Number(restaurant.deliveryFree))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary lg:size-4" size={14} />

              <span className="text-xs text-muted-foreground lg:font-semibold">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
