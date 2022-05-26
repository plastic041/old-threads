import TextInput from "./text-input";
import Thread from "./thread";
import Divider from "~/components/divider";

type MainProps = {
  threadWithPosts: ThreadWithPosts;
};
const Main = ({ threadWithPosts }: MainProps) => {
  return (
    <main className="mx-auto flex w-full flex-col gap-4 py-2 px-2 md:w-[512px] md:px-0">
      <Thread threadWithPosts={threadWithPosts} />
      <Divider />
      <TextInput tid={threadWithPosts.id} />
    </main>
  );
};
export default Main;
