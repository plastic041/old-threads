import useSWR from "swr";
import Threads from "~/components/threads";
import fetcher from "~/lib/fetcher";

const Home = () => {
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
      <Threads threads={data} />
    </div>
  );
};

export default Home;
