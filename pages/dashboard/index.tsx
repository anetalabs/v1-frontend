import { useContext, useEffect, useState } from "react";
import ChartComponent from "../../components/dashboard/ChartComponent";
import useDashboard from "../../hooks/useDashboard";
import styles from "../../styles/dashboard.module.scss";
import { numberFormat, numberToFixed } from "../../utils/format";
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
import useMediaQuery from "../../hooks/useMediaQuery";
import Tooltip from "../../components/Tooltip";
import useAssetsApi from "../../hooks/useAssetsApi";

export default function Dashboard() {
  const cNetaAmount = 120600000;
  const adaAmount = 200402;
  const cBtcAmount = 1.5023;
  const ergAmount = 56391;

  const {
    formattedDate,
    tvlData,
    protocolVolume,
    communityRevenue,
    usdAda,
    cBtcAda,
    dailyChangeCBtc,
    usdBtc,
    dailyChangeBtc,
    usdCNeta,
    usdErg,
    dailyChangeCNeta,
    dailyChangeAda,
    multisigBalance,
    hotBalance,
  } = useDashboard();

  const { stakingInfo } = useStake();

  const { data, loading } = useAssetsApi();

  const { innerWidth, outerWidth } = useWindowSize();
  const mediaMobile = useMediaQuery("( max-width: 550px )");
  const mediaLaptop = useMediaQuery("( max-width: 1250px )");
  const mediaTablet = useMediaQuery("( max-width: 750px )");
  const mediaTabletSm = useMediaQuery("( max-width: 600px )");
  const isMobile = outerWidth <= 550 || mediaMobile || innerWidth <= 550;
  const isLaptop = outerWidth <= 1250 || mediaLaptop || innerWidth <= 1250;
  const isTablet = outerWidth <= 750 || mediaTablet || innerWidth <= 750;
  const isTabletSm = outerWidth <= 600 || mediaTabletSm || innerWidth <= 600;

  const { walletMeta, address, walletAddress } = useCardanoWallet();
  const { getUtxos } = useLucid();
  const [isWalletShowing, setIsWalletShowing] = useState(false);

  const { config } = useContext(GlobalContext);
  let linkcBtc = "";
  let vaultBtc = "";
  let vaultMultisigBtc = "";

  if (config.network === "Mainnet") {
    linkcBtc = `https://cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/address/${config.btcWrapAddress}`;
    vaultMultisigBtc = `https://mempool.space/address/${config.btcMultisigAddress}`;
  } else {
    linkcBtc = `https://preprod.cardanoscan.io/token/${config.cbtcAssetId}`;
    vaultBtc = `https://mempool.space/testnet/address/${config.btcWrapAddress}`;
    vaultMultisigBtc = `https://mempool.space/testnet/address/${config.btcMultisigAddress}`;
  }

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
        <div className={styles.chartTvl}>
          <div className={styles.headerChart}>
            <div className={styles.valuesGroup}>
              <h2 className={styles.titleChart}>Circulation</h2>
              <div className={styles.tokenChart}>
                <svg width="32" height="32" id="icon">
                  <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
                </svg>
                {loading ? (
                  <div className={styles.value}>
                    <div className={styles.loader}></div>
                  </div>
                ) : (
                  <p className={styles.value}>
                    {data ? numberToFixed(data.quantity) : 0}
                  </p>
                )}
                <h3 className={styles.tokenTitle}>cBTC</h3>
                {/* {
                  <Tooltip
                    content={
                      <>
                        <h6>BTC in mulitsig vault:</h6>
                        <p>{multisigBalance ?? 0} BTC</p>
                        <div
                          style={{
                            height: "10px",
                          }}
                        />
                        <h6>BTC in hot vault:</h6>
                        <p>{hotBalance ?? 0} BTC</p>
                      </>
                    }
                    position={isMobile ? "bottom" : "right"}
                  >
                    i
                  </Tooltip>
                } */}
              </div>
              <p>{formattedDate}</p>
            </div>
            <div className={styles.btnGroup}>
              {/* <Link
                href={vaultMultisigBtc}
                className={styles.btnBtc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnText}>
                  {isMobile ? "" : "View"} Multisig Vault
                </span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link>
              <Link
                href={vaultBtc}
                className={styles.btnBtc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnText}>
                  {isMobile ? "" : "View"} Hot Vault
                </span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link> */}
              <Link
                href={linkcBtc}
                className={styles.btncBtc}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.btnText}>
                  {isMobile ? "" : "View"} cBTC Token
                </span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link>
            </div>
          </div>
          {tvlData ? (
            <ChartComponent data={tvlData} height={200} suffix={"cBTC"} />
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
          colSpanValue={isMobile ? 2 : isTabletSm ? 12 : isTablet ? 6 : 5}
          noMargin={isMobile && !!walletMeta && !!address}
        />
        {/* <Widget
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
          colSpanValue={isMobile ? 2 : isTabletSm ? 12 : isTablet ? 6 : 5}
          noMargin={isMobile && !!walletMeta && !!address}
        /> */}

        <Widget
          dailyChangePrice={dailyChangeCBtc}
          price={cBtcAda ? `₳${numberFormat(cBtcAda, 0)}` : undefined}
          miniPrice={`$${numberFormat(Number(cBtcAda) * Number(usdAda), 2, 2)}`}
          token="cBTC"
          icon={"/images/crypto/cbtc-logo.svg#Layer_1"}
        />
        <Widget
          dailyChangePrice={dailyChangeBtc}
          price={
            usdAda && usdBtc
              ? `₳${numberFormat(Number(usdBtc) / Number(usdAda), 0)}`
              : undefined
          }
          miniPrice={`$${numberFormat(usdBtc, 2, 2)}`}
          token="BTC"
          icon={"/images/crypto/bitcoin-logo.svg#Layer_1"}
        />
        <Widget
          dailyChangePrice={dailyChangeAda}
          price={usdAda ? `$${numberFormat(usdAda, 2, 2)}` : undefined}
          token="ADA"
          icon={"/images/crypto/cardano-logo.png"}
        />
        <Widget
          dailyChangePrice={dailyChangeCNeta}
          price={
            usdCNeta && usdAda
              ? `₳${numberFormat(Number(usdCNeta) / Number(usdAda), 5, 5)}`
              : undefined
          }
          token="cNETA"
          icon={"/images/crypto/cneta-logo-lg.png"}
        />
        <Widget
          price={
            hotBalance && multisigBalance && usdBtc
              ? numberFormat(Number(hotBalance) + Number(multisigBalance), 5)
              : undefined
          }
          miniPrice={`$${numberFormat(
            (Number(hotBalance) + Number(multisigBalance)) * Number(usdBtc),
            2,
            2
          )}`}
          token="BTC"
          tokenTitle="BTC TVL"
          tokenTitleTooltip={
            <>
              <h6>BTC in mulitsig vault:</h6>
              <p>{multisigBalance ?? 0} BTC</p>
              <div
                style={{
                  height: "10px",
                }}
              />
              <h6>BTC in hot vault:</h6>
              <p>{hotBalance ?? 0} BTC</p>
            </>
          }
          tokenTitleTooltipPosition={isMobile ? "right" : "top"}
          icon={"/images/crypto/bitcoin-logo.svg#Layer_1"}
          colSpanValue={isMobile ? 2 : isTablet ? 6 : isLaptop ? 8 : 3}
          buttonTitle={"Multisig Vault"}
          buttonLink={vaultMultisigBtc}
          button2Title={"Hot Vault"}
          button2Link={vaultBtc}
          buttonExternal
          button2External
          buttonGroup
          noMargin
          direction={
            isMobile ? "row" : isTablet ? "column" : isLaptop ? "row" : "column"
          }
        />
        {/* <Widget
          noPrice
          noMargin={!!walletMeta}
          title="Total cNETA Staked"
          // text="Coming Soon"
          text={
            walletMeta
              ? stakingInfo &&
                address &&
                walletAddress !== "Connecting..." &&
                usdCNeta
                ? (numberFormat(stakingInfo?.totalLiveStake.toString(), 8) ??
                    "0") + " cNETA"
                : "loading"
              : "0 cNETA"
          }
          miniText={
            walletMeta
              ? stakingInfo &&
                address &&
                walletAddress !== "Connecting..." &&
                usdCNeta
                ? "$" +
                    numberFormat(
                      (
                        stakingInfo?.totalLiveStake * Number(usdCNeta)
                      ).toString(),
                      2,
                      2
                    ) ?? "0.00"
                : "loading"
              : "$0.00"
          }
          title2={walletMeta ? "Your cNETA Staked" : undefined}
          title2Tooltip="Staked cNETA becomes active after 1 full epoch staked. If you stake during the 1st epoch, it becomes live in the 2nd epoch and rewards become available at the start of the 3rd epoch."
          title2TooltipPosition={isMobile ? "right" : "top"}
          text2={
            !walletMeta
              ? undefined
              : stakingInfo &&
                address &&
                walletAddress !== "Connecting..." &&
                usdCNeta
              ? stakingInfo.staking
                ? (numberFormat(stakingInfo?.liveStake.toString(), 8) ?? "0") +
                  " cNETA"
                : "0 cNETA"
              : "loading"
          }
          miniText2={
            walletMeta
              ? stakingInfo &&
                address &&
                walletAddress !== "Connecting..." &&
                usdCNeta
                ? "$" +
                    numberFormat(
                      (stakingInfo?.liveStake * Number(usdCNeta)).toString(),
                      2,
                      2
                    ) ?? "0.00"
                : "loading"
              : "$0.00"
          }
          buttonTitle={!walletMeta ? "Stake" : undefined}
          buttonLink="/stake"
          textRow={!walletMeta}
          colSpanValue={isMobile ? 2 : isTablet ? 12 : isLaptop ? 4 : 3}
        /> */}
        <Widget
          text={communityRevenue ? communityRevenue + " cBTC" : "loading"}
          title={`${isMobile ? "Community" : "Community"} Revenue`}
          buttonTitle="Track"
          buttonLink={
            "https://cexplorer.io/address/addr1qyxwxjg6637fw3zv5he7lxy0fmsssgk3f3dyxcg4zhumm2ur65qxyr79pkpgm225d3z3n53fwnqcfhdmv9xcemgns98qn52gr5/asset#data"
          }
          buttonExternal
          noPrice
          colSpanValue={isMobile ? 2 : isTablet ? 6 : isLaptop ? 4 : 3}
        />
        {/* <Widget
          adaPrice={adaFundPrice}
          usdPrice={usdFundPrice}
          title="Community Fund"
        />
        <Widget
          title="Mint cBTC"
          buttonTitle="Mint"
          buttonLink="/"
          noPrice
          noHeaderPrice
          titleLg
        /> */}

        {/* <Widget
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
            walletAddress !== "Connecting..." &&
            usdCNeta
              ? numberFormat(stakingInfo.liveStake.toString(), 8) + " cNETA"
              : undefined
          }
          miniText={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..." &&
            usdCNeta
              ? "$" +
                numberFormat(
                  (stakingInfo.liveStake * Number(usdCNeta)).toString(),
                  2,
                  2
                )
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
          miniTextLg
          colSpanValue={isMobile ? 1 : isTablet ? 6 : isLaptop ? 4 : 3}
        /> */}
        <Widget
          text={
            usdCNeta && usdAda && usdErg && cBtcAda
              ? "$" +
                numberFormat(
                  cNetaAmount * Number(usdCNeta) +
                    adaAmount * Number(usdAda) +
                    cBtcAmount * Number(usdAda) * Number(cBtcAda) +
                    ergAmount * Number(usdErg),
                  2,
                  2
                )
              : "loading"
          }
          miniText={
            (usdCNeta && usdAda && usdErg && cBtcAda
              ? numberFormat(
                  (cNetaAmount * Number(usdCNeta) +
                    adaAmount * Number(usdAda) +
                    cBtcAmount * Number(usdAda) * Number(cBtcAda) +
                    ergAmount * Number(usdErg)) /
                    Number(usdAda),
                  0
                )
              : "0") + " ADA"
          }
          title={`Community Fund`}
          noPrice
          noMargin
          colSpanValue={isMobile ? 2 : isTablet ? 12 : isLaptop ? 8 : 6}
          textRow
          textXl
          miniTextXl
          assets={{
            table: [
              {
                token: "cNETA",
                amount: cNetaAmount,
                adaValue: (cNetaAmount * Number(usdCNeta)) / Number(usdAda),
                usdValue: cNetaAmount * Number(usdCNeta),
              },
              {
                token: "ADA",
                amount: adaAmount,
                adaValue: adaAmount,
                usdValue: adaAmount * Number(usdAda),
              },
              {
                token: "cBTC",
                amount: cBtcAmount,
                adaValue: cBtcAmount * Number(cBtcAda),
                usdValue: cBtcAmount * Number(usdAda) * Number(cBtcAda),
              },
              {
                token: "ERG",
                amount: ergAmount,
                adaValue: (ergAmount * Number(usdErg)) / Number(usdAda),
                usdValue: ergAmount * Number(usdErg),
              },
            ],
            wallets: [
              "https://cexplorer.io/address/addr1qyxwxjg6637fw3zv5he7lxy0fmsssgk3f3dyxcg4zhumm2ur65qxyr79pkpgm225d3z3n53fwnqcfhdmv9xcemgns98qn52gr5",
              "https://cexplorer.io/address/addr1q9etscm7q6zaz7433m40q2qctyp868npxvl8amkv54ff87se47jdymvpwc7kpvjap0nf5cupj06p5ljstdzh9an6y90s68qfha",
              "https://explorer.ergoplatform.com/en/addresses/9i8StiuYEckoVNpaeU12m5DSP8shUtgh3drRtZ8EUpcYRnBLthr",
            ],
          }}
        />
        {/* <Widget
          // text="Coming Soon"
          text={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.btc * 36).toString(),
                  8
                ) + " cBTC"
              : undefined
          }
          miniText={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? "$" +
                numberFormat(
                  (
                    +stakingInfo?.expectedRewards.btc *
                    Number(usdAda) *
                    Number(cBtcAda) *
                    36
                  ).toString(),
                  2,
                  2
                )
              : undefined
          }
          text2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.erg * 36).toString(),
                  8
                ) + " ERG"
              : undefined
          }
          miniText2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? "$" +
                numberFormat(
                  (
                    +stakingInfo?.expectedRewards.erg *
                    Number(usdErg) *
                    36
                  ).toString(),
                  2,
                  2
                )
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
          noMargin={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
          }
          titleCenter={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
          }
          colSpanValue={isMobile ? 1 : isTablet ? 6 : isLaptop ? 6 : 3}
        /> */}
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

        {/* <Widget
          // text="Coming Soon"
          text={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.btc).toString(),
                  8
                ) + " cBTC"
              : undefined
          }
          miniText={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? "$" +
                numberFormat(
                  (
                    +stakingInfo?.expectedRewards.btc *
                    Number(usdAda) *
                    Number(cBtcAda)
                  ).toString(),
                  2,
                  2
                )
              : undefined
          }
          text2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? numberFormat(
                  (+stakingInfo?.expectedRewards.erg).toString(),
                  8
                ) + " ERG"
              : undefined
          }
          miniText2={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
              ? "$" +
                numberFormat(
                  (
                    +stakingInfo?.expectedRewards.erg * Number(usdErg)
                  ).toString(),
                  2,
                  2
                )
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
          noMargin={
            walletMeta &&
            stakingInfo?.staking &&
            address &&
            walletAddress !== "Connecting..."
          }
          titleCenter={
            !walletMeta ||
            !stakingInfo?.staking ||
            !address ||
            walletAddress === "Connecting..."
          }
          colSpanValue={isMobile ? 1 : isTablet ? 6 : isLaptop ? 6 : 3}
        /> */}

        <ConnectWallet
          isOpen={isWalletShowing}
          setIsOpen={setIsWalletShowing}
        />
      </section>
    </>
  );
}
