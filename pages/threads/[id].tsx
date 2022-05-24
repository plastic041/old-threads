import Thread from "~/components/thread";
import Header from "~/components/header";
import ScrollButtons from "~/components/scroll-buttons";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error } = useSWR<Thread>(
    id ? `/api/threads/${id}` : null,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header thread={data} />
      <Thread thread={data} />

      <ScrollButtons />
    </>
  );
};

export default Home;
