import PostContainer from "./post";

type ThreadContainerProps = {
  threadWithPost: Thread & {
    posts: Post[];
  };
};
const ThreadContainer = ({ threadWithPost: thread }: ThreadContainerProps) => {
  return (
    <ol className="flex list-none flex-col gap-4">
      {thread.posts.map((post) => (
        <li key={post.id}>
          <PostContainer post={post} />
        </li>
      ))}
    </ol>
  );
};

export default ThreadContainer;
