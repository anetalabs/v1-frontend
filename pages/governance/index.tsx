import styles from "../../styles/governance.module.scss";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { NumericFormat, numericFormatter } from "react-number-format";
import Head from "next/head";
import cardano from "../../public/images/crypto/Cardano.svg";
import cardanoBlack from "../../public/images/crypto/CardanoBlack.svg";
import copy from "../../public/images/crypto/Cardano.svg";
import { AppContext } from "../_app";
import { numberFormat } from "../../utils/format";
import tosidropLogo from "../../public/images/crypto/tosidrop-logo.png";
import Link from "next/link";

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
          description="Allocate 0.75 cBTC to cNETA staking and 0.5 cBTC to development."
          walletLogo={cardano}
          walletName="Option 1 Cardano Wallet"
          walletAddress="addr1q80md4t6xacfxzvm5ak903gmmed0he3d0k3x4ylxwcvy3qs5jtjeq8d8xnq59jx4c9yrt9xr6xsn0srmdy2ghgtth72qsat083"
          votes="123456"
        />
        <OptionCard
          title="Option 2"
          description="Don’t enact these allocations at this time."
          walletLogo={cardano}
          walletName="Option 2 Cardano Wallet"
          walletAddress="addr1q80md4t6xacfxzvm5ak903gmmed0he3d0k3x4ylxwcvy3qs5jtjeq8d8xnq59jx4c9yrt9xr6xsn0srmdy2ghgtth72qsat083"
          votes="123456"
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

interface OptionCardProps {
  title: string;
  description: string;
  walletLogo: StaticImageData;
  walletName: string;
  walletAddress: string;
  votes: string;
}

const OptionCard = (props: OptionCardProps) => {
  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
  };

  useEffect(() => {
    const copyToClipboard = (str: string) => {
      navigator.clipboard.writeText(str);
    };

    if (copied) {
      copyToClipboard(props.walletAddress);
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [copied, props.walletAddress]);

  // Clear the timeout if the component is unmounted before it triggers

  return (
    <div className={styles.card}>
      <h2>{props.title}</h2>
      <p className={styles.description}>{props.description}</p>
      <Image
        src={state?.darkMode ? cardano : cardanoBlack}
        className={styles.walletLogo}
        alt={`${props.walletName} logo`}
        width={120}
        height={30}
      />
      <p className={styles.walletName}>{props.walletName}</p>
      <div className={styles.address}>
        <p className={styles.addressText}>{props.walletAddress}</p>
        <button
          className={styles.addressCopyBtn}
          onClick={handleCopyClick}
          disabled={copied}
        >
          {copied ? (
            "Copied!"
          ) : state?.darkMode ? (
            <Image
              src="/images/icons/copy-dark.png"
              width={14}
              height={14}
              alt="copy"
              className={styles.icon}
            />
          ) : (
            <Image
              src="/images/icons/copy-light.png"
              width={14}
              height={14}
              alt="copy"
              className={styles.icon}
            />
          )}
        </button>
      </div>
      <div className={styles.votes}>
        <span>Current Votes: {numberFormat(props.votes)}</span>
      </div>
    </div>
  );
};
