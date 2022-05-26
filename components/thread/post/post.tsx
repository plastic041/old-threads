import dayjs from "dayjs";
import Link from "next/link";

type PostContainerProps = {
  post: Post;
};
const PostContainer = ({ post }: PostContainerProps) => {
  const createdAt = dayjs(post.created_at)
    .locale("ko")
    .format("YY-MM-DD HH:mm");

  return (
    <article className="flex flex-col rounded bg-white p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Link href={`#${post.number}`}>
            <a
              className="whitespace-pre text-teal-500 hover:underline"
              id={String(post.number)}
            >
              &gt;&gt;{post.number}
            </a>
          </Link>
          <span className="text-teal-700">{post.username}</span>
          <span className="text-teal-700">{createdAt}</span>
        </div>
        <div className="text-teal-500">
          <span>#{post.id}</span>
        </div>
      </div>
      <p
        className="whitespace-pre-wrap text-teal-900"
        style={{
          wordBreak: "keep-all",
          overflowWrap: "break-word",
        }}
      >
        {post.body}
      </p>
    </article>
  );
};

export default PostContainer;
