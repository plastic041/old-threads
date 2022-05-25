import Header from "~/components/header";
import AddThreadModal from "~/components/add-thread-modal";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { useState } from "react";
import Categories from "~/components/categories";

const Home = () => {
  const [isAddThreadModalOpen, setIsAddThreadModalOpen] = useState(false);
  const { data, error } = useSWR<
    {
      name: string;
      id: number;
      Thread: Thread[];
    }[]
  >("/api/threads", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return null;

  return (
    <div>
      <Header setModalState={setIsAddThreadModalOpen} />
      <Categories categories={data} />
      <AddThreadModal
        opened={isAddThreadModalOpen}
        setModalState={setIsAddThreadModalOpen}
      />
    </div>
  );
};

export default Home;
