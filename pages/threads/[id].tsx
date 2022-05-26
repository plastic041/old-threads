import Header from "~/components/thread-title";
import ScrollButtons from "~/components/scroll-buttons";
import fetcher from "~/lib/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import Main from "~/components/main";
import Loader from "~/components/loader";

const Home = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: threadWithPosts, error } = useSWR<
    Thread & {
      posts: Post[];
    }
  >(id ? `/api/threads/${id}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!threadWithPosts)
    return (
      <>
        <Header
          thread={{
            id: 0,
            title: "Loading...",
            created_at: "",
            category_id: 0,
          }}
        />
        <Loader />
      </>
    );

  return (
    <>
      <Header thread={threadWithPosts} />
      <Main threadWithPosts={threadWithPosts} />
      <ScrollButtons />
    </>
  );
};

export default Home;
