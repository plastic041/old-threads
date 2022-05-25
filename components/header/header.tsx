type AddThreadButtonProps = {
  setModalState: (state: boolean) => void;
};
const Header = ({ setModalState }: AddThreadButtonProps) => {
  return (
    <header className="sticky top-0 flex flex-row items-center justify-between border-b border-b-teal-900 bg-teal-200 bg-opacity-50 px-4 py-2 backdrop-blur">
      <h1 className="text-[32px]">스레</h1>
      <button className="btn btn-white" onClick={() => setModalState(true)}>
        스레 추가
      </button>
    </header>
  );
};

export default Header;
