import Header from "~/components/thread-title";
import ScrollButtons from "~/components/scroll-buttons";
import Thread from "~/components/thread";
import fetcher from "~/lib/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error } = useSWR<
    Thread & {
      posts: Post[];
    }
  >(id ? `/api/threads/${id}` : null, fetcher);

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
