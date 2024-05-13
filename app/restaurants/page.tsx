import { Suspense } from "react";
import Restaurants from "./_components/restaurants";

const RestaurantsPages = () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantsPages;
