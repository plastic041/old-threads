import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "dayjs/locale/ko";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 10000,
        focusThrottleInterval: 10000,
      }}
    >
      <div className="container mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
