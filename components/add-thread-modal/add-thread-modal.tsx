import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import useSWR from "swr";
import fetcher from "~/lib/fetcher";

import { getUserId } from "~/lib/username";

type AddThreadModalProps = {
  opened: boolean;
  setModalState: (state: boolean) => void;
};
const AddThreadModal = ({ opened, setModalState }: AddThreadModalProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(1);
  const router = useRouter();

  const { data } = useSWR<
    {
      name: string;
      id: number;
      Thread: Thread[];
    }[]
  >("/api/threads", fetcher) as {
    data: {
      name: string;
      id: number;
      Thread: Thread[];
    }[];
  };

  const onClose = () => {
    // reset form
    setTitle("");
    setBody("");
    setCategory(0);

    // close modal
    setModalState(false);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.currentTarget.value));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        username: getUserId(),
        category,
      }),
    }).then(async (data) => {
      const json = await data.json();
      router.push(`/threads/${json.id}`);
    });
  };

  if (!opened) return <div></div>;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all ${
        opened
          ? "bg-teal-700 bg-opacity-75 opacity-100"
          : "bg-transparent bg-opacity-0 opacity-0"
      }`}
      onClick={onClose}
    >
      <form
        className="flex w-80 flex-col gap-4 rounded bg-white p-4 shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={onSubmit}
      >
        <label className="flex flex-col">
          <span className="text-teal-700">카테고리</span>
          <select
            className="need-focus-outline px-2 py-2 text-teal-900"
            value={category}
            onChange={onChangeCategory}
          >
            {data.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-teal-700">스레 제목</span>
          <input
            className="need-focus-outline px-2 py-1 text-teal-900"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-teal-700">스레의 첫 번째 포스트</span>
          <textarea
            className="need-focus-outline h-40 resize-none px-2 py-1 text-teal-900"
            name="body"
            title="스레의 첫 번째 포스트"
            value={body}
            onChange={onChangeBody}
          />
        </label>
        <div className="flex flex-row justify-end gap-2">
          <button type="button" className="btn btn-white" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-color" type="submit">
            스레 추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddThreadModal;
