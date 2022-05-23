import Router from "next/router";
import { ChangeEvent, useState } from "react";

const TextInput = ({ id }: { id: string }) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  const handleSend = () => {
    const send = async () => {
      fetch(`/api/threads/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: value }),
      }).then((res) => {
        res.text().then(console.log);
        Router.reload();
      });
    };
    send();
  };
  return (
    <div className="flex flex-col items-end gap-2">
      <textarea
        className="h-40 w-full resize-none rounded border-none bg-white p-4 outline-none outline-4 focus:outline focus:outline-2 focus:outline-teal-500"
        onChange={onChange}
        value={value}
      />
      <button className="w-20 bg-white" onClick={handleSend}>
        send
      </button>
    </div>
  );
};

export default TextInput;
