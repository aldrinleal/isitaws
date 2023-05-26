import { NextUIProvider } from "@nextui-org/react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const gTagId = "G-4P00P2F7X2";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=" + gTagId}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '` +
            gTagId +
            `', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      <NextUIProvider>
        <Component {...pageProps} />
        <Analytics />
      </NextUIProvider>
    </>
  );
}
