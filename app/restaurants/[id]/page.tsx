import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_componentes/restaurant-image";
import Image from "next/image";
import { Copy, Phone, StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_componentes/cart-banner";
import { getServerSession } from "next-auth";
import { auhtOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";

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

  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard("(85) 1234 5678");
    toast.success("Número de Telefone copiado com sucesso!");
  };

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

      <div>
        <div className="lg:flex lg:pb-4 lg:pl-24 lg:pt-9">
          <RestaurantImage
            restaurant={JSON.parse(JSON.stringify(restaurant))}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />

          <div className="lg:max-w-[650px]">
            <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 md:px-24 lg:pl-10">
              <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="px-5 md:px-24 lg:pl-10">
              <DeliveryInfo
                restaurant={JSON.parse(JSON.stringify(restaurant))}
              />
            </div>

            <div className="mt-5 flex justify-between gap-4 overflow-x-scroll px-5 pb-1 md:px-24 lg:pl-10 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[150px] rounded-lg bg-[#F4F4F4] text-center md:w-[167px] lg:min-w-[159px]"
                >
                  <span className="block py-2 text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 px-5 pb-[5px] md:px-24 lg:pl-10">
              <h3 className="pb-[6px] font-semibold">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                Saboreie o melhor da gastronomia local sem sair de casa! O Food
                Express reúne uma seleção impecável de restaurantes para atender
                a todos os paladares e ocasiões.
              </p>
            </div>

            <div className="mb-3 flex justify-between md:px-5">
              <p className="flex items-center gap-2">
                <Phone className="size-4 font-bold text-purple-500" />
                (85) 1234 5678
              </p>

              <Button
                onClick={handleCopy}
                className="flex h-8 gap-1 bg-none px-3"
              >
                Copiar
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <h2 className="px-5 font-semibold md:px-24">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold  md:px-24">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        {/* <CartBanner restaurant={restaurant} /> */}
        <CartBanner restaurant={JSON.parse(JSON.stringify(restaurant))} />
      </div>
    </>
  );
};

export default RestaurantPage;
