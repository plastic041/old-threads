import Router from "next/router";
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { getUsername, makeUsername } from "~/lib/username";
import fetcher from "~/lib/fetcher";

type TextInputProps = {
  tid: number;
};
const TextInput = ({ tid }: TextInputProps) => {
  const { mutate } = useSWRConfig();
  const url = `/api/threads/${tid}`;

  const { data } = useSWR(url, fetcher) as { data: Thread & { posts: Post[] } };

  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const hasText = text.trim() !== "";
  const shouldButtonDisabled = !hasText || isSending;

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (!hasText) return;
    const send = async () => {
      setIsSending(true);
      const newThread = {
        ...data,
        posts: [
          ...data.posts,
          {
            body: text,
            username: makeUsername(getUsername(), tid),
            created_at: new Date().toISOString(),
            number: data.posts.length + 1,
            thread_id: tid,
            id: 0,
          },
        ],
      };
      mutate<
        Thread & {
          posts: Post[];
        }
      >(url, newThread, false);

      fetch(`/api/threads/${tid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: text,
          thread_id: tid,
          username: makeUsername(getUsername(), tid),
        }),
      })
        .then(() => {
          setText("");
          setIsSending(false);
        })
        .catch(() => {
          setIsError(true);
        });
    };
    send();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!hasText) return;
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleCopyReload = () => {
    setIsReloading(true);
    navigator.clipboard.writeText(text).then(() => {
      setTimeout(() => {
        Router.reload();
      }, 2000);
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <textarea
        className={`h-40 w-full resize-none rounded border-none bg-white p-4 outline-none outline-4 focus:outline focus:outline-2 focus:outline-teal-500 ${
          isSending ? "opacity-50" : ""
        }`}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={text}
        maxLength={512}
        disabled={isSending}
      />
      <div className="flex flex-row items-center justify-end">
        {isError && (
          <div className="flex flex-grow flex-col items-start text-sm text-red-600">
            <span>문제가 발생했습니다 ;︿;&nbsp;</span>
            <button
              className="animate-pulse whitespace-pre text-left text-blue-600 hover:text-blue-400"
              onClick={handleCopyReload}
            >
              {isReloading
                ? `내용을 클립보드에 복사했어요.
페이지를 다시 불러옵니다..`
                : "작성중인 내용 복사하고 새로고침"}
            </button>
          </div>
        )}
        <button
          type="submit"
          className={`btn ${
            hasText
              ? "btn-white"
              : "bg-teal-200 text-teal-400 hover:bg-teal-200"
          }`}
          disabled={shouldButtonDisabled}
        >
          <span>{isSending ? "작성 중..." : "작성"}</span>
        </button>
      </div>
    </form>
  );
};

export default TextInput;
