import styles from "../../styles/stake.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import ConnectWallet from "../../components/partials/navbar/ConnectWallet";
import useCardanoWallet from "../../hooks/useCardanoWallet";
import useStake from "../../hooks/useStake";
import Link from "next/link";
import { numberFormat } from "../../utils/format";
import useLucid from "../../hooks/useLucid";
import { GlobalContext } from "../../components/GlobalContext";

export default function Stake() {
  const { getUtxos } = useLucid();
  const { walletMeta, address } = useCardanoWallet();
  const { config, lucid } = useContext(GlobalContext);
  const [isWalletShowing, setIsWalletShowing] = useState(false);
  const { stakingInfo, fetchStake } = useStake();
  const [stakeLoading, setStakeLoading] = useState(false);
  const [cNetaBalance, setCNetaBalance] = useState(0);

  const handleStake = useCallback(async () => {
    setStakeLoading(true);
    fetchStake(address);
  }, [fetchStake, address]);

  const handleWalletShowing = () => {
    if (isWalletShowing) setIsWalletShowing(false);
    else setIsWalletShowing(true);
  };

  const fetchCNetaBalance = useCallback(async () => {
    const utxos = await getUtxos();

    const sumBalanceCNETA = utxos.reduce((total, utxo) => {
      const amountForUnit = Number(utxo.assets[config.cnetaAssetId]) ?? 0;

      if (amountForUnit) {
        const quantity = Number(amountForUnit);
        total += quantity;
      }
      return total;
    }, 0);

    setCNetaBalance(sumBalanceCNETA);
  }, [config.cnetaAssetId, getUtxos]);

  useEffect(() => {
    if (stakingInfo?.staking) {
      setStakeLoading(false);
    }
  }, [stakingInfo]);

  useEffect(() => {
    fetchCNetaBalance();
    console.log("fetchCNetaBalance");
  }, [fetchCNetaBalance]);

  return (
    <>
      <Head>
        <title>Staking | anetaBTC</title>
      </Head>
      <main className={styles.stake}>
        {walletMeta && !stakingInfo ? (
          <div className={styles.loaderContainer}>
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
                    {numberFormat(cNetaBalance.toString() ?? "0", 8)} cNETA.
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
                    {numberFormat(stakingInfo?.liveStake.toString() ?? "0", 8)}{" "}
                    cNETA.
                  </b>
                  <br />
                  Track all staking details in our dashboard.
                </p>
              )}
              {(!stakingInfo?.staking || !walletMeta) && (
                <div className={styles.infoRow}>
                  <p className={styles.description}>
                    Your Estimated Rewards Each Epoch
                    <svg height={16} width={16} className={styles.icon}>
                      <use href="/images/icons/coins.svg#icon"></use>
                    </svg>
                  </p>
                  <div className={styles.amount}>
                    <p>
                      {walletMeta && stakingInfo
                        ? numberFormat(
                            (+stakingInfo?.expectedRewards.btc).toString() ??
                              "0.00000",
                            8,
                            5
                          )
                        : "0.00000"}{" "}
                      cBTC
                    </p>
                    <p>
                      {walletMeta && stakingInfo
                        ? numberFormat(
                            (+stakingInfo?.expectedRewards.erg).toString() ??
                              "0",
                            8
                          )
                        : "0"}{" "}
                      rsERG
                    </p>
                  </div>
                </div>
              )}
            </section>
            {!walletMeta && (
              <button onClick={handleWalletShowing}>Connect Wallet</button>
            )}
            {walletMeta && !stakingInfo?.staking && (
              <button
                onClick={handleStake}
                disabled={!stakingInfo || stakeLoading}
              >
                {stakeLoading ? "Staking..." : "Stake"}
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
