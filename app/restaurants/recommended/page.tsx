import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Separator } from "@/app/_components/ui/separator";
import { auhtOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(auhtOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header haveSearchBar={true} />

      <Separator />

      <div className="px-5 py-6 md:px-24">
        <h2 className=" mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>

        <div className="flex w-full grid-cols-2 flex-col gap-6 md:grid lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              userFavoriteRestaurants={userFavoriteRestaurants}
              key={restaurant.id}
              restaurant={JSON.parse(JSON.stringify(restaurant))}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
