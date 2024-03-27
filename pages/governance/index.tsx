import styles from "../../styles/governance.module.scss";
import Image from "next/image";
import Head from "next/head";
import tosidropLogo from "../../public/images/crypto/tosidrop-logo.png";
import Link from "next/link";
import OptionCard from "../../components/governance/OptionCard";

export default function Governance() {
  return (
    <>
      <Head>
        <title>Governance | anetaBTC</title>
      </Head>
      <main className={styles.governance}>
        <p className={styles.text}>
          Send your cVOTE6 tokens to the wallet you would like to vote for. At
          the end of the 48-hour voting period, the option with the most votes
          will be the outcome of the governance event.
        </p>
        <OptionCard
          title="Option 1"
          description="Allocate 0.5 BTC for development."
          walletName="Option 1 Cardano Wallet"
          walletAddress="addr1qy8cmq0qw8dj7zeyfezp9vwfgjyv3tu8e7a82qe4fvr8dxwpsmwhh9rxntndhz93m944fsh0s9y725fr0as26y0wkceq9pyx90"
          votes="0"
        />
        <OptionCard
          title="Option 2"
          description="Do not allocate 0.5 BTC for development."
          walletName="Option 2 Cardano Wallet"
          walletAddress="addr1q843md2ar09mervl060ypmhzx43ftnrqzymz4pk4rr5clcrr2jt3ptrul97g7fzk3w7dkv7rkw5mej7jr65x4v3xqqns5yepxp"
          votes="0"
        />
        <Link
          href="https://app.tosidrop.io/cardano/claim"
          target="_blank"
          className={styles.button}
        >
          Claim cVOTE6 tokens on{" "}
          <Image
            src={tosidropLogo}
            alt="tosidrop logo"
            width={120}
            height={36}
            className={styles.tosidropLogo}
          />{" "}
          <svg width="25" height="25" id="">
            <use href={"/images/icons/right-arrow.svg#icon"}></use>
          </svg>
        </Link>
      </main>
    </>
  );
}
