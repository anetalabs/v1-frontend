import styles from "../../styles/swap.module.scss";
import Swap from '@dexhunterio/swaps'
import '@dexhunterio/swaps/lib/assets/style.css'
import { useState, useEffect, useContext } from "react"; 
import { AppContext } from "../../pages/_app";
import Head from "next/head";

export default function SwapIntegration() {
  const [isLibraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    // Replace this with your actual library loading logic
    const loadLibrary = async () => {
      await import("@dexhunterio/swaps");
      setLibraryLoaded(true);
    };

    loadLibrary();
  }, []);

  const state = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Swap | anetaBTC</title>
      </Head>
      <section className={styles.swapContainer}>
        {isLibraryLoaded && (
          <Swap
            orderTypes={["SWAP", "LIMIT"]}
            defaultToken="4190b2941d9be04acc69c39739bd5acc66d60ccab480d8e20bc87e3763425443"
            colors={
              !state?.state.darkMode
                ? {
                    background: "#FFFFFF",
                    containers: "#F0F0F0",
                    subText: "#000000",
                    mainText: "#000000",
                    buttonText: "#000000",
                    accent: "#1F509A",
                  }
                : {
                    background: "#111111",
                    containers: "#191B23",
                    subText: "#88919E",
                    mainText: "#FFFFFF",
                    buttonText: "#FFFFFF",
                    accent: "#1F509A",
                  }
            }
            theme="dark"
            width="450"
            partnerCode="anetav161646472317139657473636d3771367a617a373433336d3430713271637479703836386e7078766c38616d6b76353466663837736534376a64796d76707763376b70766a6170306e66356375706a303670356c6a7374647a6839616e3679393073363871666861da39a3ee5e6b4b0d3255bfef95601890afd80709"
            partnerName="AnetaV1"
          />
        )}
      </section>
    </>
  );
}