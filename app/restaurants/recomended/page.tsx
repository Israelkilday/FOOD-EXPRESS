import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const Recomenderestaurant = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className=" mb-6 text-lg font-semibold">Restaurantes Favoriotos</h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Recomenderestaurant;
