import { ChangeEvent, FormEvent, useState } from "react";

import { getUsername } from "~/lib/username";

type AddThreadModalProps = {
  opened: boolean;
  setModalState: (state: boolean) => void;
};
const AddThreadModal = ({ opened, setModalState }: AddThreadModalProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
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
        username: getUsername(),
      }),
    }).then(async (data) => {
      const id = await data.json();
      console.log(id);
      // Router.push(data);
    });
  };

  if (!opened) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm transition-all ${
        opened
          ? "bg-teal-700 bg-opacity-75 opacity-100"
          : "bg-transparent bg-opacity-0 opacity-0"
      }`}
      onClick={() => setModalState(false)}
    >
      <form
        className="flex w-80 flex-col gap-4 rounded bg-white p-4 shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={onSubmit}
      >
        <label className="flex flex-col text-teal-700">
          <span>스레 제목</span>
          <input
            className="px-2 py-1 outline outline-1 outline-teal-900 focus:outline-2"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
        </label>
        <label className="flex flex-col text-teal-700">
          <span>스레의 첫 번째 포스트</span>
          <textarea
            className="h-40 resize-none px-2 py-1 outline outline-1 outline-teal-900 focus:outline-2"
            name="body"
            title="스레의 첫 번째 포스트"
            value={body}
            onChange={onChangeBody}
          />
        </label>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="bg-white px-4 py-2 outline outline-1 outline-teal-700"
            onClick={() => setModalState(false)}
          >
            취소
          </button>
          <button
            className="bg-teal-200 px-4 py-2 outline outline-1 outline-teal-200"
            type="submit"
          >
            스레 추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddThreadModal;
