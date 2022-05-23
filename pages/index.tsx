import Threads from "~/components/threads";
import { fetchData } from "~/lib/data";

export const getStaticProps = async () => {
  const data = await fetchData();
  const threads = data.threads.map((thread) => {
    const createdAt = thread.posts[0].createdAt;
    return {
      createdAt,
      title: thread.title,
      id: thread.id,
    };
  });

  return {
    props: {
      threads,
    },
  };
};

const Home = (data: {
  threads: { createdAt: string; title: string; id: string }[];
}) => {
  return (
    <div>
      <Threads threads={data.threads} />
    </div>
  );
};

export default Home;
