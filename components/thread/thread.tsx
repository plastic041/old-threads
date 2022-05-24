import TextInput from "~/components/text-input";
import PostContainer from "./post";

type ThreadContainerProps = {
  thread: Thread;
};
const ThreadContainer = ({ thread }: ThreadContainerProps) => {
  return (
    <main className="mx-auto flex w-full flex-col gap-4 py-2 px-2 md:px-64 2xl:px-40">
      <ol className="flex list-none flex-col gap-4">
        {thread.posts.map((post) => (
          <li key={post.id}>
            <PostContainer post={post} />
          </li>
        ))}
      </ol>
      <div className="border-b border-dashed border-black" />
      <TextInput id={thread.id} />
    </main>
  );
};

export default ThreadContainer;
