import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import Promobanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <main>
      <header>
        <Header haveSearchBar={false} />
      </header>

      <section className="items-center justify-between overflow-hidden md:flex md:h-[400px] md:bg-primary md:px-24 lg:h-[500px]">
        <div className="">
          <div className="hidden md:block">
            <h1 className="pb-4 font-poppins font-bold text-white md:animate-slide_name md:text-4xl lg:text-6xl">
              Está com Fome?
            </h1>
            <p className="pb-6 text-sm font-semibold text-white md:animate-slide_name_2 lg:text-base">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>
          </div>

          <div className="rounded-lg px-5 pb-4 md:animate-slide_form md:bg-white md:px-0 md:pt-4">
            <Search />
          </div>
        </div>

        <div className="hidden lg:flex">
          <Image
            width={780}
            height={0}
            src="/img-hero-section.png"
            alt="img-hero-section"
            style={{
              objectFit: "contain",
            }}
            className="translate-x-24 translate-y-32 animate-rotation"
          />
        </div>
      </section>

      <div className="px-5 pt-4 md:px-24 lg:pt-11">
        <CategoryList />
      </div>

      <div className="px-0 pt-6 md:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <Promobanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:pt-11">
        <div className="flex items-center justify-between px-5 md:px-24">
          <h2 className="font-semibold lg:text-xl">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended" className="lg:text-base">
              Ver Todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="min-w-full gap-3 px-5 pt-6 md:flex md:px-24 lg:pt-11">
        <Link
          href={`/categories/${pizzasCategory?.id}/products`}
          className="hidden md:flex"
        >
          <Promobanner
            src="/promo_banner.svg"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>

        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <Promobanner
            src="/promo_banner_2.svg"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:pt-11">
        <div className="flex items-center justify-between px-5 md:px-24">
          <h2 className="font-semibold lg:text-xl">
            Restaurantes Recomendados
          </h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended" className="lg:text-base">
              Ver Todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </main>
  );
};

export default Home;
