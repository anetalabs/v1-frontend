import { useContext, useEffect, useState } from "react";
import ChartComponent from "../../components/dashboard/ChartComponent";
import useAssetsApi from "../../hooks/useAssetsApi";
import useDashboard from "../../hooks/useDashboard";
import styles from "../../styles/dashboard.module.scss";
import { formatAmount, numberToFixed } from "../../utils/format";
import { GlobalContext } from "../../components/GlobalContext";
import Link from "next/link";
import Image from "next/image";
import useCardanoWallet from "../../hooks/useCardanoWallet";
import useLucid from "../../hooks/useLucid";
import ConnectWallet from "../../components/partials/navbar/ConnectWallet";

export default function Dashboard() {
  const {
    usdBtcPrice,
    usdcBtcPrice,
    adaBtcPrice,
    adacBtcPrice,
    dailyChangeBtcPrice,
    formattedDate,
    tvlData,
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
            <ChartComponent data={tvlData} />
          ) : (
            <div className={styles.loaderChart}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
        <div className={styles.sectionPrice}>
          <div className={styles.priceBtc}>
            <div className={styles.headerPrice}>
              <div className={styles.token}>
                <svg width="25" height="25" id="icon">
                  <use href="/images/crypto/bitcoin-logo.svg#Layer_1"></use>
                </svg>
                <p className={styles.tokenTitle}>BTC Price</p>
              </div>
              {dailyChangeBtcPrice && (
                <p
                  className={`${styles.changeDaily} ${
                    dailyChangeBtcPrice?.startsWith("-") ? styles.negative : ""
                  }`}
                >
                  {dailyChangeBtcPrice?.startsWith("-") ? undefined : "+"}
                  {dailyChangeBtcPrice}%
                </p>
              )}
            </div>
            {adaBtcPrice && usdBtcPrice ? (
              <>
                <div className={styles.adaPrice}>{adaBtcPrice}</div>
                <p className={styles.usdPrice}>{usdBtcPrice}</p>
              </>
            ) : (
              <>
                <div className={styles.loaderPrice}>
                  <div className={styles.loader}></div>
                </div>
              </>
            )}
          </div>
          <div className={styles.pricecBtc}>
            <div className={styles.headerPrice}>
              <div className={styles.token}>
                <svg width="25" height="25" id="icon">
                  <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
                </svg>
                <p className={styles.tokenTitle}>cBTC Price</p>
              </div>
            </div>
            {adacBtcPrice && usdcBtcPrice ? (
              <>
                <div className={styles.adaPrice}>{adacBtcPrice}</div>
                <p className={styles.usdPrice}>{usdcBtcPrice}</p>
              </>
            ) : (
              <>
                <div className={styles.loaderPrice}>
                  <div className={styles.loader}></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.sectionBalance}>
        <div className={styles.balanceGroup}>
          <div className={styles.balance}>
            <h3 className={styles.balanceTitle}>Your cBTC</h3>
            {walletMeta ? (
              <div className={styles.balanceValue}>
                <svg width="25" height="25" id="icon">
                  <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
                </svg>
                <p className={styles.text}>cBTC</p>
                <p className={styles.value}>{balanceCBtc}</p>
              </div>
            ) : (
              <button
                className={styles.connectBtn}
                onClick={() =>
                  isWalletShowing
                    ? setIsWalletShowing(false)
                    : setIsWalletShowing(true)
                }
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className={styles.balance}>
            <h3 className={styles.balanceTitle}>Your cNETA</h3>
            {walletMeta ? (
              <div className={styles.balanceValue}>
                <Image
                  src="/images/crypto/cneta-logo.png"
                  alt="logo-cneta"
                  width={25}
                  height={25}
                />
                <p className={styles.text}>cNETA</p>
                <p className={styles.value}>{balanceCNeta}</p>
              </div>
            ) : (
              <button
                className={styles.connectBtn}
                onClick={() =>
                  isWalletShowing
                    ? setIsWalletShowing(false)
                    : setIsWalletShowing(true)
                }
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <ConnectWallet
          isOpen={isWalletShowing}
          setIsOpen={setIsWalletShowing}
        />
        <div className={styles.mint}>
          <h3 className={styles.mintTitle}>Mint cBTC, Earn cNETA</h3>
          <Link href="/" className={styles.mintBtn}>
            Mint cBTC
          </Link>
        </div>
        <div className={styles.claim}>
          <h3 className={styles.claimTitle}>Claim Rewards</h3>
          <Link href="https://app.tosidrop.io/cardano/claim" className={styles.claimBtn} target="_blank" rel="noreferrer">
            Claim
          </Link>
        </div>
      </div>
    </section>
  );
}
