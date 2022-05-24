import Router from "next/router";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

const TextInput = ({ id }: { id: string }) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const hasText = text.trim() !== "";

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (!hasText) return;
    const send = async () => {
      setIsSending(true);

      fetch(`/api/threads/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: text }),
      }).then(() => {
        Router.reload();
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-end gap-2">
      <textarea
        className="h-40 w-full resize-none rounded border-none bg-white p-4 outline-none outline-4 focus:outline focus:outline-2 focus:outline-teal-500"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={text}
        maxLength={512}
      />
      <button
        type="submit"
        className={`w-20 ${
          hasText
            ? "cursor-pointer bg-white hover:bg-teal-100"
            : "bg-teal-100 text-teal-300"
        }`}
        disabled={isSending || !hasText}
      >
        작성
      </button>
    </form>
  );
};

export default TextInput;
