import dayjs from "dayjs";
import Link from "next/link";

type PostContainerProps = {
  post: Post;
};
const PostContainer = ({ post }: PostContainerProps) => {
  const createdAt = dayjs(post.createdAt).format("YYYY-MM-DD HH:mm");
  return (
    <article className="flex flex-col bg-white p-4 rounded">
      <div className="flex flex-row gap-2">
        <Link href={`#${post.number}`}>
          <a>
            <span className="text-teal-900" id={String(post.number)}>
              &gt;&gt;{post.number}
            </span>
          </a>
        </Link>
        <span className="text-teal-600">{createdAt}</span>
      </div>
      <p className="text-teal-900">{post.body}</p>
    </article>
  );
};

export default PostContainer;
