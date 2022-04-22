import "../styles/globals.css";

import "../constants/react-pro-sidebar/custom.scss"

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>수선 OK</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;