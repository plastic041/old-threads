import Link from "next/link";
import dayjs from "dayjs";

type ThreadsProps = {
  threads: Thread[];
};
const Threads = ({ threads }: ThreadsProps) => {
  const firstCreatedAt = threads[0].posts[0].createdAt;
  const firstCreatedAtFormatted = dayjs(firstCreatedAt).format("YYYY-MM-DD");
  return (
    <ul className="flex list-none flex-col">
      {threads.map((thread) => (
        <li key={thread.id} className="flex">
          <Link href={`/threads/${thread.id}`}>
            <a className="flex flex-grow flex-row items-center gap-4 bg-white px-4 py-2 hover:bg-teal-100">
              <span>{thread.title}</span>
              <span className="text-teal-700">{firstCreatedAtFormatted}</span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Threads;
