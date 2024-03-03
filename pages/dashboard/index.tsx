import { useContext, useEffect, useState } from "react";
import ChartComponent from "../../components/dashboard/ChartComponent";
import useAssetsApi from "../../hooks/useAssetsApi";
import useDashboard from "../../hooks/useDashboard";
import styles from "../../styles/dashboard.module.scss";
import { formatAmount, numberToFixed } from "../../utils/format";
import { GlobalContext } from "../../components/GlobalContext";
import Link from "next/link";
import useCardanoWallet from "../../hooks/useCardanoWallet";
import useLucid from "../../hooks/useLucid";
import ConnectWallet from "../../components/partials/navbar/ConnectWallet";
import Head from "next/head";
import ChartWidget from "../../components/dashboard/ChartWidget";
import Widget from "../../components/dashboard/Widget";

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
  } = useDashboard();

  const { data, loading } = useAssetsApi();

  const { walletMeta, address, walletAddress } = useCardanoWallet();
  const { getUtxos } = useLucid();
  const [isWalletShowing, setIsWalletShowing] = useState(false);
  const [balanceCBtc, setBalanceCBtc] = useState<null | string>(null);
  const [balanceCNeta, setBalanceCNeta] = useState<null | string>(null);

  const { config } = useContext(GlobalContext);
  let linkcBtc = "";
  let vaultBtc = "";

  if (config.network === "Mainnet") {
    linkcBtc = `https://cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/address/${config.btcWrapAddress}`;
  } else {
    linkcBtc = `https://preprod.cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/testnet/address/${config.btcWrapAddress}`;
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
    setBalanceCBtc(formatAmount(sumBalanceCBTC / 100000000));
    setBalanceCNeta(formatAmount(sumBalanceCNETA));
  };

  useEffect(() => {
    if (address !== "") {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <Head>
        <title>Dashboard | anetaBTC</title>
      </Head>
      <section className={styles.dashboardContainer}>
        <div className={styles.sectionChart}>
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
                  <p className={styles.btnText}>View BTC Vaults</p>
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
                  <p className={styles.btnText}>View cBTC Token</p>
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
            value={protocolVolume ?? "0"}
            token="BTC"
            data={tvlData}
            buttonTitle="Track"
            onButtonClick={vaultBtc}
          />
          <ChartWidget
            title="Community Revenue"
            value={protocolVolume ?? "0"}
            token="BTC"
            data={tvlData}
          />
        </div>
        <Widget
          noPrice
          noHeaderPrice
          titleLg={!walletMeta}
          title="Your cBTC"
          walletMeta={walletMeta}
          walletBalance={balanceCBtc}
          buttonClick={handleWalletShowing}
          buttonTitle={!walletMeta ? "Connect Wallet" : undefined}
          token="cBTC"
          icon="/images/crypto/cbtc-logo.svg#Layer_1"
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
          title="Stake cNETA"
          buttonTitle="Stake"
          buttonLink="/stake"
          noPrice
          noHeaderPrice
          titleLg
        />
        <Widget
          adaValue="Coming Soon"
          title="Your Estimated Rewards"
          buttonTitle="Claim"
          buttonLink="https://app.tosidrop.io/cardano/claim"
          externalLink
          noPrice
          noMargin
        />
        <Widget
          noPrice
          noMargin
          adaValue="Coming Soon"
          title="Total cNETA Staked"
          // adaValue2={walletMeta ? balanceCNeta ?? "loading" : "--"}
          adaValue2="Coming Soon"
          title2="Your cNETA Staked"
        />
        <Widget
          title="Next Claiming Period"
          noPrice
          // currentDate="2024-03-12 21:45:00 UTC"
          timerInterval={5}
          timerStart="2024/01/15 21:45:00 UTC"
        />
        <Widget
          title="Mint cBTC"
          buttonTitle="Mint"
          buttonLink="/"
          noPrice
          noHeaderPrice
          titleLg
        />
        <ConnectWallet
          isOpen={isWalletShowing}
          setIsOpen={setIsWalletShowing}
        />
      </section>
    </>
  );
}