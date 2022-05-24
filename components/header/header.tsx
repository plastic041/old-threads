import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type HeaderProps = {
  thread: Thread;
};
const Header = ({ thread }: HeaderProps) => {
  return (
    <header className="flex flex-row items-center gap-4 bg-white px-4 py-2">
      <nav>
        <Link href="/">
          <a className="text-teal-700 hover:text-teal-500">
            <ArrowLeftIcon className="h-8 w-8" />
          </a>
        </Link>
      </nav>
      <h1 className="text-[16px] md:text-[32px]">{thread.title}</h1>
    </header>
  );
};

export default Header;
