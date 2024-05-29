import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { Separator } from "@/app/_components/ui/separator";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
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

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header haveSearchBar={true} />

      <Separator />

      <div className="px-5 py-6 md:px-24 ">
        <h2 className=" mb-6 text-lg font-semibold">{category.name}</h2>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {category.products.map((product) => (
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

export default CategoriesPage;
