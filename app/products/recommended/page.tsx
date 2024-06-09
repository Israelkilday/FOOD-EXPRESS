import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { Separator } from "@/app/_components/ui/separator";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header haveSearchBar={true} />

      <Separator />

      <div className="px-5 py-6 md:px-24 lg:pt-16">
        <h2 className=" mb-6 text-lg font-semibold lg:text-xl">
          Pedidos Recomendados
        </h2>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-16">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
