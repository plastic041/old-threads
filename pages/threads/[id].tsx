import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "~/components/loader";
import Main from "~/components/main";
import ScrollButtons from "~/components/scroll-buttons";
import Header from "~/components/thread-title";
import fetcher from "~/lib/fetcher";

const Home = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: threadWithPosts, error } = useSWR<ThreadWithPosts>(
    id ? `/api/threads/${id}` : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!threadWithPosts)
    return (
      <>
        <Head>
          <title>스레입니다 (｡･∀･)ﾉﾞ</title>
        </Head>
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
      <Head>
        <title>{threadWithPosts.title}</title>
      </Head>
      <Header thread={threadWithPosts} />
      <Main threadWithPosts={threadWithPosts} />
      <ScrollButtons />
    </>
  );
};

export default Home;
