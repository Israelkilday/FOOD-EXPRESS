import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFree" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="mt-6 flex items-center justify-around py-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <BikeIcon className="text-primary" size={14} />
            <span className="text-xs">Entrega</span>
          </div>

          {Number(restaurant.deliveryFree) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFree))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs">Entrega</span>
          </div>

          <p className="text-xs font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
