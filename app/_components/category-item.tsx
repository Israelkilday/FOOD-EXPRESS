import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="justfy-center flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-md duration-150 hover:bg-primary hover:text-white lg:px-7"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />

      <span className="text-sm font-semibold lg:text-base">
        {category.name}
      </span>
    </Link>
  );
};

export default CategoryItem;
