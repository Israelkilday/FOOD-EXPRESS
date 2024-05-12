import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const Cart = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isComfirmDialogOpen, setIsComfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const { products, subTotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);

  const handleFinishiOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subTotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFree: restaurant.deliveryFree,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            {/* TOTAIS */}
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Subtotal
                    </span>
                    <span>{formatCurrency(subTotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Discontos
                    </span>
                    <span>-{formatCurrency(totalDiscount)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Entrega
                    </span>

                    {Number(products?.[0].restaurant.deliveryFree) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFree),
                      )
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* FINALIZAR PEDIDO */}
            <Button
              className="mt-6 w-full"
              onClick={() => setIsComfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              Finalizar Pedido
            </Button>
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia</h2>
        )}
      </div>

      <AlertDialog
        open={isComfirmDialogOpen}
        onOpenChange={setIsComfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao Finalizar seu pedido, voçe concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinishiOrderClick}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
