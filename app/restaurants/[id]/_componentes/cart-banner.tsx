"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { formatCurrency } from "@/app/_helpers/price";
import { CartContext } from "@/app/context/cart";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted-foreground bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* PREÇO */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total Sem Entrega
          </span>

          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {""}/ {totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}
            </span>
          </h3>
        </div>

        {/* BOTÃO */}
        <Sheet>
          <SheetTrigger>
            <Button>Ver Sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>

            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
