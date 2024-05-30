import { getServerSession } from "next-auth";
import { auhtOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { Separator } from "../_components/ui/separator";
import { Soup } from "lucide-react";
import { Card } from "../_components/ui/card";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(auhtOptions);

  if (!session) {
    return redirect("/");
  }

  const userFavoriterestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header haveSearchBar={true} />

      <Separator />

      <div className="px-5 py-6 md:px-24">
        <h2 className=" mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>

        <div className="flex min-w-full grid-cols-2 flex-col flex-wrap gap-6 md:grid lg:grid-cols-4">
          {userFavoriterestaurants.length > 0 ? (
            userFavoriterestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={JSON.parse(JSON.stringify(restaurant))}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriterestaurants}
              />
            ))
          ) : (
            <Card className="flex flex-col items-center gap-5 p-4 text-center shadow-lg md:min-w-96 md:flex-row-reverse md:text-left lg:min-w-[500px]">
              <h3 className="font-medium">
                Voçê ainda não marcou nenhum restaurante como favorito.
              </h3>

              <Soup className="size-32 text-primary" />
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
