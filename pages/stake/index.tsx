import styles from "../../styles/stake.module.scss";
import { useCallback, useState } from "react";
import Head from "next/head";
import ConnectWallet from "../../components/partials/navbar/ConnectWallet";
import useCardanoWallet from "../../hooks/useCardanoWallet";
import useStakingInfo from "../../hooks/useStakingInfo";
import Link from "next/link";
import { numberFormat } from "../../utils/format";

export default function Stake() {
  const { walletMeta, address, walletAddress } = useCardanoWallet();
  const [isWalletShowing, setIsWalletShowing] = useState(false);
  const [stakingInfo, fetchStakingInfo] = useStakingInfo();
  const [stakeLoading, setStakeLoading] = useState(false);

  const handleStake = useCallback(async () => {
    setStakeLoading(true);
    try {
      const res = await fetch("api/stake");
      const data = await res.json();
      if (data.result === "ok") {
        fetchStakingInfo();
      }
    } catch (error) {
      console.error("Error fetching stake:", error);
    }
    setStakeLoading(false);
  }, [fetchStakingInfo]);

  const handleWalletShowing = () => {
    if (isWalletShowing) setIsWalletShowing(false);
    else setIsWalletShowing(true);
  };

  return (
    <>
      <Head>
        <title>Staking | anetaBTC</title>
      </Head>
      <main className={styles.stake}>
        {!stakingInfo ? (
          <div className={styles.loaderChart}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <section>
              {!walletMeta && <p>Connect your wallet to stake.</p>}
              {walletMeta && !stakingInfo?.staking && (
                <p>
                  You are currently holding{" "}
                  <b>
                    {numberFormat(stakingInfo?.stake.toString() ?? "0", 5)}{" "}
                    cNETA.
                  </b>
                  <br />
                  Stake it to your earn share of 0.75 cBTC and 18,000 rsERG.
                  Rewards are distributed each epoch. Once you are staked,
                  additionally accumulated cNETA in your wallet will be
                  automatically staked.{" "}
                </p>
              )}
              {walletMeta && stakingInfo?.staking && (
                <p>
                  You are now staking{" "}
                  <b>
                    {numberFormat(stakingInfo?.liveStake.toString() ?? "0", 5)}{" "}
                    cNETA.
                  </b>
                  <br />
                  Track all staking details in our dashboard.
                </p>
              )}
              {!stakingInfo?.staking ||
                (!walletMeta && (
                  <div className={styles.infoRow}>
                    <p className={styles.description}>
                      Your Estimated Rewards Each Epoch
                      <svg height={16} width={16} className={styles.icon}>
                        <use href="/images/icons/coins.svg#icon"></use>
                      </svg>
                    </p>
                    <div className={styles.amount}>
                      <p>
                        {walletMeta
                          ? numberFormat(
                              stakingInfo?.rewards.btc.toString() ?? "0",
                              5
                            )
                          : "0.00000"}{" "}
                        cBTC
                      </p>
                      <p>
                        {walletMeta
                          ? numberFormat(
                              stakingInfo?.rewards.erg.toString() ?? "0",
                              5
                            )
                          : "0"}{" "}
                        rsERG
                      </p>
                    </div>
                  </div>
                ))}
            </section>
            {!walletMeta && (
              <button onClick={handleWalletShowing}>Connect Wallet</button>
            )}
            {walletMeta && !stakingInfo?.staking && (
              <button
                onClick={handleStake}
                disabled={!stakingInfo || stakeLoading}
              >
                Stake
              </button>
            )}
            {walletMeta && stakingInfo?.staking && (
              <Link href="/dashboard" className={styles.button}>
                Dashboard
              </Link>
            )}
            {/* <div className={styles.comingSoon}>Coming Soon</div> */}
          </>
        )}
      </main>
      <ConnectWallet isOpen={isWalletShowing} setIsOpen={setIsWalletShowing} />
    </>
  );
}
