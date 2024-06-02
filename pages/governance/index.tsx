import styles from "../../styles/governance.module.scss";
import Image from "next/image";
import Head from "next/head";
import tosidropLogo from "../../public/images/crypto/tosidrop-logo.png";
import Link from "next/link";
import OptionCard from "../../components/governance/OptionCard";
import useVoting from "../../hooks/useVoting";
import { GlobalContext } from "../../components/GlobalContext";
import { useContext } from "react";

export default function Governance() {
  const votingInfo = useVoting();
	const { config } = useContext(GlobalContext);
  return (
			<>
				<Head>
					<title>Governance | anetaBTC</title>
				</Head>
				<main className={styles.governance}>
					<p className={styles.text}>
						Send your {config.governanceAssetName} tokens to the wallet you
						would like to vote for. At the end of the 72-hour voting period, the
						option with the most votes will be the outcome of the governance
						event.
					</p>
					{config.governanceOptions?.map((option, i) => (
						<OptionCard
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i + 1}
							title={`Option ${i + 1}`}
							description={option.details}
							walletName={`Option ${i + 1} Cardano Wallet`}
							walletAddress={option.address}
							votes={
								(i === 0
									? votingInfo?.voteYesBalance
									: votingInfo?.voteNoBalance) ?? 0
							}
						/>
					))}
					<Link
						href="https://app.tosidrop.io/cardano/claim"
						target="_blank"
						className={styles.button}
					>
						Claim {config.governanceAssetName} tokens on{" "}
						<Image
							src={tosidropLogo}
							alt="tosidrop logo"
							width={120}
							height={36}
							className={styles.tosidropLogo}
						/>{" "}
						<svg width="25" height="25" id="">
							<title>Right Arrow icon</title>
							<use href={"/images/icons/right-arrow.svg#icon"} />
						</svg>
					</Link>
				</main>
			</>
		);
}
