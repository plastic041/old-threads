import PostContainer from "../post";

type ThreadContainerProps = {
  thread: Thread;
};
const ThreadContainer = ({ thread }: ThreadContainerProps) => {
  return (
    <main className="w-96 mx-auto">
      <ol className="list-none flex flex-col gap-4">
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
