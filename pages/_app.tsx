import "../styles/globals.css";
import type { AppProps } from "next/app";
import "dayjs/locale/ko";

const isServer = typeof window === "undefined";

// call msw
if (process.env.NODE_ENV === "test") {
  if (isServer) {
    const callMsw = async () => {
      const { server } = await import("~/src/mocks/server");
      server.listen();
    };
    callMsw();
  } else {
    const callMsw = async () => {
      const { worker } = await import("~/src/mocks/browser");
      worker.start();
    };
    callMsw();
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
