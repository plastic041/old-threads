import AddThreadButton from "~/components/add-thread-button";
import AddThreadModal from "~/components/add-thread";
import Threads from "~/components/threads";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { useState } from "react";

const Home = () => {
  const [isAddThreadModalOpen, setIsAddThreadModalOpen] = useState(false);
  const { data, error } = useSWR<
    {
      createdAt: string;
      title: string;
      id: string;
    }[]
  >("/api/threads", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <AddThreadButton setModalState={setIsAddThreadModalOpen} />
      <Threads threads={data} />
      <AddThreadModal
        opened={isAddThreadModalOpen}
        setModalState={setIsAddThreadModalOpen}
      />
    </div>
  );
};

export default Home;
