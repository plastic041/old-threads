import useSWR from "swr";
import fetcher from "~/lib/fetcher";

type AddThreadButtonProps = {
  setModalState: (state: boolean) => void;
};
const AddThreadButton = ({ setModalState }: AddThreadButtonProps) => {
  const { data } = useSWR<
    {
      createdAt: string;
      title: string;
      id: string;
    }[]
  >("/api/threads", fetcher) as {
    data: { createdAt: string; title: string; id: string }[];
  };

  return (
    <button
      className="absolute bottom-16 right-16 rounded bg-white p-4"
      onClick={() => setModalState(true)}
    >
      스레 추가
    </button>
  );
};

export default AddThreadButton;
