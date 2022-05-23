import PostContainer from "./post";

type ThreadContainerProps = {
  thread: Thread;
};
const ThreadContainer = ({ thread }: ThreadContainerProps) => {
  return (
    <main className="mx-auto w-96 py-4">
      <ol className="flex list-none flex-col gap-4">
        {thread.posts.map((post) => (
          <li key={post.id}>
            <PostContainer post={post} />
          </li>
        ))}
      </ol>
    </main>
  );
};

export default ThreadContainer;
