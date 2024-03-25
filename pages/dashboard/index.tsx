import { useCallback, useContext, useEffect, useState } from "react";
import ChartComponent from "../../components/dashboard/ChartComponent";
import useAssetsApi from "../../hooks/useAssetsApi";
import useDashboard from "../../hooks/useDashboard";
import styles from "../../styles/dashboard.module.scss";
import { formatAmount, numberFormat, numberToFixed } from "../../utils/format";
import { GlobalContext } from "../../components/GlobalContext";
import Link from "next/link";
import useCardanoWallet from "../../hooks/useCardanoWallet";
import useLucid from "../../hooks/useLucid";
import ConnectWallet from "../../components/partials/navbar/ConnectWallet";
import Head from "next/head";
import ChartWidget from "../../components/dashboard/ChartWidget";
import Widget from "../../components/dashboard/Widget";
import useWindowSize from "../../hooks/useResponsive";
import useStake from "../../hooks/useStake";

export default function Dashboard() {
  const {
    usdBtcPrice,
    usdcBtcPrice,
    adaBtcPrice,
    adacBtcPrice,
    dailyChangeBtcPrice,
    formattedDate,
    tvlData,
    adaFundPrice,
    usdFundPrice,
    protocolVolume,
    communityRevenue,
  } = useDashboard();

  const { stakingInfo, fetchStake } = useStake();

  const { width } = useWindowSize();
  const isMobile = width <= 450;

  const { data, loading } = useAssetsApi();

  const { walletMeta, address, walletAddress } = useCardanoWallet();
  const { getUtxos } = useLucid();
  const [isWalletShowing, setIsWalletShowing] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);

  const { config } = useContext(GlobalContext);
  let linkcBtc = "";
  let vaultBtc = "";
  let communityVaultBtc = "";

  if (config.network === "Mainnet") {
    linkcBtc = `https://cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/address/${config.btcWrapAddress}`;
    communityVaultBtc = `https://mempool.space/address/${config.btcWrapCommunityAddress}`;
  } else {
    linkcBtc = `https://preprod.cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/testnet/address/${config.btcWrapAddress}`;
    communityVaultBtc = `https://mempool.space/testnet/address/${config.btcWrapCommunityAddress}`;
  }

  const handleWalletShowing = () => {
    if (isWalletShowing) setIsWalletShowing(false);
    else setIsWalletShowing(true);
  };

  const getBalance = async () => {
    const utxos = await getUtxos();

    let sumBalanceCBTC = 0;
    let sumBalanceCNETA = 0;

    sumBalanceCBTC = utxos.reduce((total, utxo) => {
      const amountForUnit = Number(utxo.assets[config.cbtcAssetId]) ?? 0;

      if (amountForUnit) {
        const quantity = Number(amountForUnit);
        total += quantity;
      }
      return total;
    }, 0);

    sumBalanceCNETA = utxos.reduce((total, utxo) => {
      const amountForUnit = Number(utxo.assets[config.cnetaAssetId]) ?? 0;

      if (amountForUnit) {
        const quantity = Number(amountForUnit);
        total += quantity;
      }
      return total;
    }, 0);
  };

  const handleStake = useCallback(async () => {
    setStakeLoading(true);
    fetchStake(address);
  }, [fetchStake, address]);

  useEffect(() => {
    if (address !== "") {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (stakingInfo?.staking) {
      setStakeLoading(false);
    }
  }, [stakingInfo]);

  return (
    <>
      <Head>
        <title>Dashboard | anetaBTC</title>
      </Head>
      <section className={styles.dashboardContainer}>
        <div className={styles.chartTvl}>
          <div className={styles.headerChart}>
            <div className={styles.valuesGroup}>
              <h2 className={styles.titleChart}>TVL</h2>
              <div className={styles.tokenChart}>
                <svg width="32" height="32" id="icon">
                  <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
                </svg>
                {loading ? (
                  <div className={styles.value}>
                    <div className={styles.loader}></div>
                  </div>
                ) : (
                  data && (
                    <p className={styles.value}>
                      {numberToFixed(data.quantity)}
                    </p>
                  )
                )}
                <h3 className={styles.tokenTitle}>cBTC</h3>
              </div>
              <p>{formattedDate}</p>
            </div>
            <div className={styles.btnGroup}>
              <Link
                href={vaultBtc}
                className={styles.btnBtc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnText}>View BTC Vaults</span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link>
              <Link
                href={linkcBtc}
                className={styles.btncBtc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnText}>View cBTC Token</span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link>
            </div>
          </div>
          {tvlData ? (
            <ChartComponent data={tvlData} height={200} />
          ) : (
            <div className={styles.loaderChart}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>

        <ChartWidget
          title="Protocol Volume"
          value={protocolVolume ?? "loading"}
          token="BTC"
          data={tvlData}
          buttonTitle="Track"
          onButtonClick={vaultBtc}
        />
        {/* <ChartWidget
          title="Community Revenue"
          value={communityRevenue ?? "0"}
          token="cBTC"
          data={[]}
          buttonTitle="Track"
          onButtonClick={communityVaultBtc}
        /> */}
        <Widget
          title="Next Claiming Period"
          noPrice
          // currentDate="2024-03-12 21:45:00 UTC"
          timerInterval={5}
          timerStart="2024/01/15 21:45:00 UTC"
          // text="Coming Soon"
          headerButtonTitle={
            walletMeta && address && walletAddress !== "Connecting..."
              ? "Claim"
              : undefined
          }
          headerButtonClick="https://app.tosidrop.io/cardano/claim"
          colSpan
          colSpanSm
          noMargin={isMobile && !!walletMeta && !!address}
        />

        <Widget
          text={communityRevenue ? communityRevenue + " cBTC" : "loading"}
          title={`${isMobile ? "Community" : "Community"} Revenue`}
          buttonTitle="Track"
          buttonLink={
            "https://cexplorer.io/address/addr1vyxwxjg6637fw3zv5he7lxy0fmsssgk3f3dyxcg4zhumm2csgwlax/asset#data"
          }
          externalLink
          noPrice
          noMargin
        />
        <Widget
          dailyChangePrice={dailyChangeBtcPrice}
          adaPrice={adaBtcPrice}
          usdPrice={usdBtcPrice}
          token="BTC"
          icon={"/images/crypto/bitcoin-logo.svg#Layer_1"}
        />
        <Widget
          adaPrice={adaFundPrice}
          usdPrice={usdFundPrice}
          title="Community Fund"
        />
        <Widget
          noPrice
          noMargin
          title="Total cNETA Staked"
          // text="Coming Soon"
          text={
            walletMeta
              ? stakingInfo && address && walletAddress !== "Connecting..."
                ? (numberFormat(stakingInfo?.totalLiveStake.toString(), 5) ??
                    "0") + " cNETA"
                : "loading"
              : "0 cNETA"
          }
          title2={walletMeta ? "Your cNETA Staked" : undefined}
          title2Tooltip="Staked cNETA becomes active after 1 full epoch staked. If you stake during the 1st epoch, it becomes live in the 2nd epoch and rewards become available at the start of the 3rd epoch."
          text2={
            !walletMeta
              ? undefined
              : stakingInfo && address && walletAddress !== "Connecting..."
              ? stakingInfo.staking
                ? (numberFormat(stakingInfo?.liveStake.toString(), 5) ?? "0") +
                  " cNETA"
                : "0 cNETA"
              : "loading"
          }
          buttonTitle={!walletMeta ? "Stake" : undefined}
          buttonLink="/stake"
          // titleCenter={
          //   !!walletMeta &&
          //   !(
          //     stakingInfo?.staking &&
          //     address &&
          //     walletAddress !== "Connecting..."
          //   )
          // }
          // textLg={
          //   !(
          //     walletMeta &&
          //     stakingInfo?.staking &&
          //     address &&
          //     walletAddress !== "Connecting..."
          //   )
          // }
          // paddingTop={
          //   walletMeta && !stakingInfo?.staking ? "1.75rem" : undefined
          // }
        />
        <Widget
          title="Mint cBTC"
          buttonTitle="Mint"
          buttonLink="/"
          noPrice
          noHeaderPrice
          titleLg
        />
        <Widget
          // text="Coming Soon"
          text={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.btc * 36).toString(),
                  5
                ) + " cBTC"
              : undefined
          }
          text2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.erg * 36).toString(),
                  5
                ) + " ERG"
              : undefined
          }
          title={`Your Total ${isMobile ? "Est." : "Estimated"} Rewards`}
          buttonTitle={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
              ? "Stake"
              : undefined
          }
          buttonLink="/stake"
          noPrice
          noHeaderPrice
          titleCenter={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
          }
        />
        {/* <Widget
          noPrice
          noHeaderPrice
          titleLg
          title="Your cBTC"
          walletMeta={walletMeta}
          walletBalance={balanceCBtc}
          buttonClick={handleWalletShowing}
          buttonTitle={
            !walletMeta ? (isMobile ? "Connect" : "Connect Wallet") : undefined
          }
          token="cBTC"
          icon="/images/crypto/cbtc-logo.svg#Layer_1"
          titleLeft={!!walletMeta}
        /> */}
        <Widget
          title={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? "Live Stake"
              : "Stake cNETA"
          }
          text={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(stakingInfo.liveStake.toString(), 5) + " cNETA"
              : undefined
          }
          buttonTitle={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
              ? "Stake"
              : undefined
          }
          buttonLink="/stake"
          // tooltip="Staked cNETA becomes active after 1 full epoch staked. If you stake during the 1st epoch, it becomes live in the 2nd epoch and rewards become available at the start of the 3rd epoch."
          noPrice
          noHeaderPrice
          titleLg
          textLg
        />
        <Widget
          // text="Coming Soon"
          text={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.btc).toString(),
                  5
                ) + " cBTC"
              : undefined
          }
          text2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.erg).toString(),
                  5
                ) + " ERG"
              : undefined
          }
          title={`Your Rewards Next Epoch`}
          buttonTitle={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
              ? "Stake"
              : undefined
          }
          buttonLink="/stake"
          noPrice
          noHeaderPrice
          titleCenter={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
          }
        />
        <ConnectWallet
          isOpen={isWalletShowing}
          setIsOpen={setIsWalletShowing}
        />
      </section>
    </>
  );
}
