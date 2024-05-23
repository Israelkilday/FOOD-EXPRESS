import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 justify-around gap-3 md:grid-cols-3 lg:flex lg:w-full">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
