"use server";

import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  return db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
};
