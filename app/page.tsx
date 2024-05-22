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
      <Header />

      <section className="items-center justify-between overflow-x-hidden md:flex md:h-[400px] md:bg-primary md:px-24 lg:h-[500px]">
        <div className="">
          <div className="hidden md:block">
            <h1 className="pb-4 font-poppins font-bold text-white md:text-4xl lg:text-6xl">
              Está com Fome?
            </h1>
            <p className="pb-6 text-sm font-semibold text-white lg:text-base">
              Com apenas alguns cliques, encntre refeições acessíveis perto de
              você.
            </p>
          </div>

          <div className="rounded-lg px-5 py-6 md:bg-white md:px-0">
            <Search />
          </div>
        </div>

        <div className="hidden lg:flex">
          <Image
            width={620}
            height={0}
            src="/img-hero-section.png"
            alt="img-hero-section"
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "0",
              objectFit: "contain",
            }}
          />
        </div>
      </section>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-0 pt-6">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <Promobanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver Todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-0 pt-6">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <Promobanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches "
          />
        </Link>
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
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
