import { GetStaticPaths, GetStaticProps } from "next";
import Thread from "~/components/thread";
import Header from "~/components/header";
import ScrollButtons from "~/components/scroll-buttons";
import faker from "@faker-js/faker";
import Data from "~/lib/data";

export const getStaticProps: GetStaticProps = async (context) => {
  const { tid } = context.params;
  // const res = await fetch(`/api/thread/${tid}`);
  // const thread = await res.json();

  // console.log(thread);

  // return {
  //   props: {
  //     thread,
  //   },
  // };

  faker.seed(tid.length);
  return {
    props: {
      thread: Data.thread(100),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch("/api/threads");
  // const threads: Thread = await res.json();
  // const paths = threads.map((thread) => ({
  //   params: {
  //     tid: thread.id,
  //   },
  // }));

  return {
    paths: [
      {
        params: {
          tid: "somethread",
        },
      },
    ],
    fallback: false,
  };
};

const Home = ({ thread }: { thread: Thread }) => {
  return (
    <>
      <Header thread={thread} />
      <div className="h-4" />
      <Thread thread={thread} />
      <ScrollButtons />
    </>
  );
};

export default Home;
