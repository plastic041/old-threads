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
      <button className="btn btn-white" onClick={scrollTop}>
        Top
      </button>
      <button className="btn btn-white" onClick={scrollBottom}>
        Bottom
      </button>
    </div>
  );
};

export default ScrollButtons;
