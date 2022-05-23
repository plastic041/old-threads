import Link from "next/link";
import Threads from "~/components/threads";
import { fetchData } from "~/lib/data";

export const getStaticProps = async () => {
  const { threads } = await fetchData();

  return {
    props: {
      threads,
    },
  };
};

const Home = (data: { threads: Thread[] }) => {
  return (
    <div>
      <Threads threads={data.threads} />
    </div>
    // <div>
    //   {data.threads.map((thread) => (
    //     <div key={thread.id}>
    //       <Link href={`/threads/${thread.id}`}>
    //         <a>{thread.title}</a>
    //       </Link>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Home;
