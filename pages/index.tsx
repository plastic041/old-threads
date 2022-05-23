import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  // const { data, error } = useSWR<Thread>("/api/thread/somethread", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <div>
      <Link href="/thread/somethread">
        <a>to some thread</a>
      </Link>
    </div>
  );
};

export default Home;
