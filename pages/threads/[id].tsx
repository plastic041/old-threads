import { GetStaticPaths, GetStaticProps } from "next";
import Thread from "~/components/thread";
import Header from "~/components/header";
import ScrollButtons from "~/components/scroll-buttons";
import { fetchData } from "~/lib/data";
import TextInput from "~/components/text-input";

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as unknown as { id: string };
  const { threads } = await fetchData();
  const thread = threads.find((thread) => thread.id === id);
  console.log(id);

  return {
    props: {
      thread,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { threads }: { threads: Thread[] } = await fetchData();
  const paths = threads.map((thread) => ({
    params: {
      id: thread.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const Home = ({ thread }: { thread: Thread }) => {
  return (
    <>
      <Header thread={thread} />
      <Thread thread={thread} />

      <ScrollButtons />
    </>
  );
};

export default Home;
