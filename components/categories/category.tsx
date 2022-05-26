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
      {category.Thread.length > 0 ? (
        <Threads threads={category.Thread} />
      ) : (
        <p className="px-4 py-2 text-teal-900">스레가 없어요 (っ °Д °;)っ</p>
      )}
    </section>
  );
};

export default CategoryContainer;
