import Link from "next/link";

const Nothing = () => {
  return (
    <div className="flex h-40 w-full flex-col items-center justify-center">
      <h2>여기엔 아무것도 없어요</h2>
      <h2>(´。＿。｀)</h2>
      <Link href="/">
        <a className="text-blue-500 hover:text-blue-700">홈으로 돌아가기</a>
      </Link>
    </div>
  );
};

export default Nothing;
