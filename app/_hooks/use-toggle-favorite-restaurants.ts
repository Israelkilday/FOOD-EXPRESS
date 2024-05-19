import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { UserFavoriteRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteResrtaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorited?: boolean;
  userFavoriteRestaurants?: UserFavoriteRestaurant[];
}

const UseToggleFavoriteResrtaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteResrtaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurant Favoritado!",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Error ao favoritar Reataurant.");
    }
  };

  return { handleFavoriteClick };
};

export default UseToggleFavoriteResrtaurant;
