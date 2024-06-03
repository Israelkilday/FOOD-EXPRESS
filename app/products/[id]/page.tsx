import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import { Separator } from "@/app/_components/ui/separator";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <div className="hidden md:block">
        <Header haveSearchBar={true} />

        <Separator className="hidden lg:flex" />
      </div>

      <ProductImage product={product} />
      <div>
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </div>
  );
};

export default ProductPage;
