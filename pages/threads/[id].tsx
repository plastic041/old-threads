import Thread from "~/components/thread";
import Header from "~/components/header";
import ScrollButtons from "~/components/scroll-buttons";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as unknown as { id: string };
//   const { threads } = await fetchData();
//   const thread = threads.find((thread) => thread.id === id);

//   return {
//     props: {
//       thread,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { threads }: { threads: Thread[] } = await fetchData();
//   const paths = threads.map((thread) => ({
//     params: {
//       id: thread.id,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

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
