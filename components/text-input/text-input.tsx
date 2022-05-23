const TextInput = () => {
  return (
    <div className="flex flex-col items-end gap-2">
      <textarea className="h-40 w-full resize-none rounded border-none bg-white p-4 outline-none outline-4 focus:outline focus:outline-2 focus:outline-teal-500" />
      <button className="w-20 bg-white">send</button>
    </div>
  );
};

export default TextInput;
