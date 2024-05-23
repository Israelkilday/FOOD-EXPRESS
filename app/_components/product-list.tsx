import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-hidden px-5 md:max-w-[675px] md:px-24 lg:max-w-[1250px] [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
