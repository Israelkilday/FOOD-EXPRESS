import { getServerSession } from "next-auth";
import { auhtOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(auhtOptions);

  if (!session) {
    return notFound();
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
      <Header />

      <div className="px-5 py-6">
        <h2 className=" mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>

        <div className="flex w-full flex-col gap-6">
          {userFavoriterestaurants.length > 0 ? (
            userFavoriterestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriterestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Voçê ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
