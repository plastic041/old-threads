import Router from "next/router";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { getUsername } from "~/lib/username";

type TextInputProps = {
  tid: string;
};
const TextInput = ({ tid }: TextInputProps) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(true);
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

      fetch(`/api/threads/${tid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: text,
          thread_id: tid,
          username: getUsername(tid),
        }),
      })
        .then(() => {
          Router.reload();
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
        className="h-40 w-full resize-none rounded border-none bg-white p-4 outline-none outline-4 focus:outline focus:outline-2 focus:outline-teal-500"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={text}
        maxLength={512}
      />
      <div className="flex flex-row justify-end">
        {isError && (
          <div className="flex flex-grow flex-col items-start text-red-600">
            <span>문제가 발생했습니다 ＞︿＜&nbsp;</span>
            <button
              className="animate-pulse text-blue-600 hover:text-blue-400"
              onClick={handleCopyReload}
            >
              {isReloading
                ? "내용을 복사했어요. 페이지를 다시 불러옵니다.."
                : "작성중인 내용 복사하고 새로고침"}
            </button>
          </div>
        )}
        <button
          type="submit"
          className={`w-20 ${
            hasText
              ? "cursor-pointer bg-white hover:bg-teal-100"
              : "bg-teal-100 text-teal-300"
          }`}
          disabled={shouldButtonDisabled}
        >
          작성
        </button>
      </div>
    </form>
  );
};

export default TextInput;
