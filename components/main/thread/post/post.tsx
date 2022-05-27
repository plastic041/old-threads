import dayjs from "dayjs";
import Link from "next/link";
import { autolink } from "~/lib/autolink";
import { escapeHtml } from "~/lib/escapeHtml";

const bodyWithLinks = (p: string, maxNumber: number) => {
  const sanitized = escapeHtml(p);
  const autolinked = autolink(sanitized, maxNumber);
  return autolinked;
};

type PostContainerProps = {
  post: Post;
  maxNumber: number;
};
const PostContainer = ({ post, maxNumber }: PostContainerProps) => {
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
        className="post-body whitespace-pre-wrap text-teal-900"
        style={{
          wordBreak: "keep-all",
          overflowWrap: "break-word",
        }}
        dangerouslySetInnerHTML={{
          __html: bodyWithLinks(post.body, maxNumber),
        }}
      />
    </article>
  );
};

export default PostContainer;
