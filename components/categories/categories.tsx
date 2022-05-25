import CategoryContainer from "./category";

type CategoriesProps = {
  categories: {
    name: string;
    id: number;
    Thread: Thread[];
  }[];
};
const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="my-4 flex flex-col gap-2">
      {categories.map((category) => (
        <CategoryContainer key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
