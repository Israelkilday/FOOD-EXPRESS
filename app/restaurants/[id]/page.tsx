import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_componentes/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_componentes/cart-banner";
import { getServerSession } from "next-auth";
import { auhtOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import { Separator } from "@/app/_components/ui/separator";
import DescriptionRestaurant from "@/app/_components/description-restaurant";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(auhtOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <div className="hidden md:block">
        <Header haveSearchBar={true} />

        <Separator className="hidden lg:flex" />
      </div>

      <div className="lg:flex lg:pl-24 lg:pt-16">
        <RestaurantImage
          restaurant={JSON.parse(JSON.stringify(restaurant))}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />

        <section className="lg:max-w-[600px]">
          <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 md:px-24 lg:pl-10">
            <div className="flex items-center gap-[0.375rem]">
              <div className="relative h-8 w-8 lg:h-10 lg:w-10">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-base font-semibold lg:text-lg">
                {restaurant.name}
              </h1>
            </div>

            <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">5.0</span>
            </div>
          </div>

          <div className="px-5 md:px-24 lg:pl-10">
            <DeliveryInfo restaurant={JSON.parse(JSON.stringify(restaurant))} />
          </div>

          <div className="mt-6 flex justify-between gap-4 overflow-x-scroll px-5 md:px-24 lg:pl-10 [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[150px] rounded-lg bg-[#F4F4F4] text-center md:w-[167px] lg:min-w-[140px]"
              >
                <span className="block py-2 text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <DescriptionRestaurant />
        </section>
      </div>

      <div className="mt-2 space-y-4 pt-5 lg:pt-9">
        <h2 className="px-5 font-semibold md:px-24 lg:text-xl">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-9 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold md:px-24 lg:text-xl">
            {category.name}
          </h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </>
  );
};

export default RestaurantPage;
