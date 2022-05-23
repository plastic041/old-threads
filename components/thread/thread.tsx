import TextInput from "~/components/text-input";
import PostContainer from "./post";

type ThreadContainerProps = {
  thread: Thread;
};
const ThreadContainer = ({ thread }: ThreadContainerProps) => {
  return (
    <main className="mx-auto flex w-96 flex-col gap-4 py-4">
      <ol className="flex list-none flex-col gap-4">
        {thread.posts.map((post) => (
          <li key={post.id}>
            <PostContainer post={post} />
          </li>
        ))}
      </ol>
      <div className="border-b border-dashed border-black" />
      <TextInput />
    </main>
  );
};

export default ThreadContainer;
