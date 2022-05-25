import Threads from "./threads";

type CategoryProps = {
  category: {
    name: string;
    id: number;
    Thread: Thread[];
  };
};
const CategoryContainer = ({ category }: CategoryProps) => {
  return (
    <section className="flex flex-col">
      <h2 className="px-2 py-1">{category.name}</h2>
      <Threads threads={category.Thread} />
    </section>
  );
};

export default CategoryContainer;
