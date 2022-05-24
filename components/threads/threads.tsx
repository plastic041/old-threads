import Link from "next/link";
import dayjs from "dayjs";

type ThreadsProps = {
  threads: {
    createdAt: string;
    title: string;
    id: string;
  }[];
};
const Threads = ({ threads }: ThreadsProps) => {
  return (
    <ul className="flex list-none flex-col">
      {threads.map((thread) => (
        <li key={thread.id} className="flex">
          <Link href={`/threads/${thread.id}`}>
            <a className="flex flex-grow flex-col items-start bg-white px-4 py-2 hover:bg-teal-100">
              <span className="max-w-[60%] text-teal-900">{thread.title}</span>
              <span className="text-teal-700">
                {dayjs(thread.createdAt)
                  .locale("ko")
                  .format("YYYY-MM-DD a hh:mm")}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Threads;
