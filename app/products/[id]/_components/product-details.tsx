"use client";

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DisconutBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { CartContext } from "@/app/context/cart";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import ProductImage from "./product-image";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCArtOpen] = useState(false);
  const [isComfirmationDialogOpen, setIsComfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCArtOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantsProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantsProduct) {
      return setIsComfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <>
      <div>
        <div className="lg:flex lg:pl-24">
          <ProductImage product={product} />

          <div className="lg:max-w-[700px]">
            <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white pt-5">
              <div className=" px-5 pb-3 pt-2 md:px-24 lg:pl-10">
                <Card className="flex w-fit items-center gap-[0.375rem] p-3 shadow-md">
                  <div className="relative h-7 w-7 md:h-10 md:w-10">
                    <Image
                      src={product.restaurant.imageUrl}
                      alt={product.restaurant.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <span className="text-xs text-muted-foreground md:text-base">
                    {product.restaurant.name}
                  </span>
                </Card>
              </div>

              <h1 className="mb-4 mt-1 px-5 text-base font-semibold md:px-24 lg:pl-10 lg:text-lg">
                {product.name}
              </h1>

              <div className="flex justify-between px-5 pb-1 md:px-24 lg:pl-10">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      {formatCurrency(calculateProductTotalPrice(product))}
                    </h2>
                    {product.discountPercentage > 0 && (
                      <DisconutBadge product={product} />
                    )}
                  </div>

                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-muted-foreground line-through">
                      De: {formatCurrency(Number(product.price))}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3 text-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="border border-solid border-muted-foreground"
                    onClick={handleDecreaseQuantityClick}
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <span className="w-4">{quantity}</span>
                  <Button size="icon" onClick={handleIncreaseQuantityClick}>
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>

              <div className="px-5 md:px-24 lg:pl-10">
                <DeliveryInfo
                  restaurant={JSON.parse(JSON.stringify(product.restaurant))}
                />
              </div>

              <div className="mt-8 px-5 md:px-24 lg:pl-10">
                <Card className="p-5 shadow-md">
                  <div>
                    <h3 className="pb-2 font-semibold lg:text-lg">Sobre</h3>
                    <Separator className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold md:px-24 lg:text-lg">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>

        <div className="mt-8 px-5 md:px-24">
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            Adicionar à Sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCArtOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>

          <Cart setIsOpen={setIsCArtOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isComfirmationDialogOpen}
        onOpenChange={setIsComfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Voçe só pode adicionar items de um restaurante por vez.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
