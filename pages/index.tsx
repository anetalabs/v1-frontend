import Head from "next/head";
import WrapUnwrap from "../components/home/WrapUnwrap";

export default function Home() {

  return (
    <>
      <Head>
        <title>Wrapping | anetaBTC</title>
          <meta name="description" content="A protocol to unlock the value of Bitcoin on Ergo and Cardano" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9BD9F2"/>
          <meta name="msapplication-TileColor" content="#9bd9f2"/>
          <meta name="theme-color" content="#ffffff"/>
      </Head>
      <main>
        <WrapUnwrap />
      </main>
    </>
  );
}
