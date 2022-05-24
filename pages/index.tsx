import useSWR from "swr";
import Threads from "~/components/threads";
import fetcher from "~/lib/fetcher";

// export const getStaticProps = async () => {
//   const data = await fetchData();
//   const threads = data.threads.map((thread) => {
//     const createdAt = thread.posts[0].createdAt;
//     return {
//       createdAt,
//       title: thread.title,
//       id: thread.id,
//     };
//   });

//   return {
//     props: {
//       threads,
//     },
//   };
// };

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
