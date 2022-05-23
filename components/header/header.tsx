type HeaderProps = {
  thread: Thread;
};
const Header = ({ thread }: HeaderProps) => {
  return (
    <header className="flex flex-row px-4 py-2 bg-white">
      <h1 className="text-[32px]">{thread.title}</h1>
    </header>
  );
};

export default Header;
