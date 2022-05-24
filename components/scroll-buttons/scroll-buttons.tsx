const ScrollButtons = () => {
  const scrollTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollBottom = () => {
    scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-52 right-0 m-4 flex flex-row gap-2">
      <button
        className="rounded bg-teal-500 py-2 px-4 text-white hover:bg-teal-700"
        onClick={scrollTop}
      >
        Top
      </button>
      <button
        className="rounded bg-teal-500 py-2 px-4 text-white hover:bg-teal-700"
        onClick={scrollBottom}
      >
        Bottom
      </button>
    </div>
  );
};

export default ScrollButtons;
