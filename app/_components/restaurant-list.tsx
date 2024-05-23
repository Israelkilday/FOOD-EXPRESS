import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { auhtOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(auhtOptions);

  // TODO pegar restaurantes com maior número de pedidos
  const resturants = await db.restaurant.findMany({ take: 10 });

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 md:max-w-[675px] md:px-24 lg:max-w-[1250px] [&::-webkit-scrollbar]:hidden">
      {resturants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          // restaurant={restaurant}
          restaurant={JSON.parse(JSON.stringify(restaurant))}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
