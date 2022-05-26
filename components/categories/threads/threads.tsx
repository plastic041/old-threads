import dayjs from "dayjs";
import Link from "next/link";

type ThreadsProps = {
  threads: Thread[];
};
const Threads = ({ threads }: ThreadsProps) => {
  return (
    <ul className="flex list-none flex-col">
      {threads.map((thread) => (
        <li key={thread.id} className="flex">
          <Link href={`/threads/${thread.id}`}>
            <a className="flex flex-grow flex-col items-start bg-white px-4 py-2 transition hover:bg-teal-100">
              <span className="max-w-[60%] text-teal-900">{thread.title}</span>
              <span className="text-teal-700">
                {dayjs(thread.created_at).locale("ko").format("YY-MM-DD HH:mm")}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Threads;
