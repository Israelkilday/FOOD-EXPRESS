import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {/* TOTAIS */}
      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subTotalPrice)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Discontos</span>
              <span>-{formatCurrency(totalDiscount)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Entrega</span>

              {Number(products[0].restaurant.deliveryFree) === 0 ? (
                <span className="uppercase text-primary">Grátis</span>
              ) : (
                formatCurrency(Number(products[0].restaurant.deliveryFree))
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
      <Button className="mt-6 w-full">Finalizar Pedido</Button>
    </div>
  );
};

export default Cart;
