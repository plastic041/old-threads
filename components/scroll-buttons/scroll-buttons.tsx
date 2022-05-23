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
    <div className="fixed bottom-0 right-0 m-4 flex flex-row gap-2">
      <button
        className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        onClick={scrollTop}
      >
        Top
      </button>
      <button
        className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        onClick={scrollBottom}
      >
        Bottom
      </button>
    </div>
  );
};

export default ScrollButtons;
