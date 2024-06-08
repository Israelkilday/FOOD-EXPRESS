import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}
const RestaurantPrevDescription = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-2 md:px-24 lg:pl-10">
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 ">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <span className="text-xs text-muted-foreground md:text-sm lg:text-base">
          {product.restaurant.name}
        </span>
      </div>

      <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
        <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-semibold">5.0</span>
      </div>
    </div>
  );
};

export default RestaurantPrevDescription;
