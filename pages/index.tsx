import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import AddThreadModal from "~/components/add-thread-modal";
import Categories from "~/components/categories";
import Header from "~/components/header";
import fetcher from "~/lib/fetcher";

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
      <Head>
        <title>스레입니다 (｡･∀･)ﾉﾞ</title>
      </Head>
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
