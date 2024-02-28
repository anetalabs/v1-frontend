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
import { AnetaData } from "../../hooks/useAnetaData";
import { Cip30Wallet } from "@cardano-sdk/dapp-connector";
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
    adaFundPrice,
    usdFundPrice,
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
        <ChartWidget
          title="Protocol Volume"
          amount={4567}
          suffix="ADA"
          data={tvlData}
          hasFilter
        />
        <ChartWidget
          title="Community Revenue"
          amount={4567}
          suffix="ADA"
          data={tvlData}
        />
      </div>
      <Widget
        noPrice
        noHeaderPrice
        titleLg={!balanceCBtc && !walletMeta}
        title="Your cBTC"
        walletMeta={walletMeta}
        walletBalance={balanceCBtc}
        onWalletBtnClick={handleWalletShowing}
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
        adaValue="12"
        title="Your Estimated Rewards"
        buttonTitle="Claim Rewards"
        buttonLink="https://app.tosidrop.io/cardano/claim"
        externalLink
        noPrice
        noMargin
      />
      <Widget
        noPrice
        noMargin
        adaValue="1,234"
        title="Total cNETA Staked"
        adaValue2={balanceCNeta ?? "--"}
        title2="Your cNETA Staked"
      />
      <Widget title="Next Claiming Period" noPrice timer="2024/03/05" />
      <Widget
        title="Mint cBTC"
        buttonTitle="Mint"
        buttonLink="/"
        noPrice
        noHeaderPrice
        titleLg
      />
      <ConnectWallet isOpen={isWalletShowing} setIsOpen={setIsWalletShowing} />
      {/* <div className={styles.sectionBalance}>
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
          <Link
            href="https://app.tosidrop.io/cardano/claim"
            className={styles.claimBtn}
            target="_blank"
            rel="noreferrer"
          >
            Claim
          </Link>
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
          <Link
            href="https://app.tosidrop.io/cardano/claim"
            className={styles.claimBtn}
            target="_blank"
            rel="noreferrer"
          >
            Claim
          </Link>
        </div>
      </div> */}
    </section>
  );
}

interface ChartWidgetProps {
  title: string;
  amount: number;
  suffix: string;
  data?: AnetaData[];
  hasFilter?: boolean;
}

const ChartWidget = (props: ChartWidgetProps) => {
  return (
    <div className={styles.chartWidget}>
      <div className={styles.headerChart}>
        <div className={styles.valuesGroup}>
          <h2 className={styles.titleChart}>{props.title}</h2>
          <div className={styles.tokenChart}>
            <h3 className={styles.tokenTitle}>
              {props.amount} {props.suffix}
            </h3>
          </div>
        </div>
        {props.hasFilter && (
          <div className={styles.btnGroup}>
            <Link
              href={"#"}
              className={styles.btnBtc}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={styles.btnText}>All Time</p>
              <svg width="12" height="12" id="icon" className={styles.icon}>
                <use href="/images/icons/arrow-right.svg#icon"></use>
              </svg>
            </Link>
          </div>
        )}
      </div>
      {props.data ? (
        <ChartComponent
          data={props.data}
          height={70}
          suffix={props.suffix}
          hideLegends
        />
      ) : (
        <div className={styles.loaderChart}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};

interface WidgetProps {
  dailyChangePrice?: string;
  adaPrice?: string;
  usdPrice?: string;
  token?: string;
  icon?: string;
  title?: string;
  buttonTitle?: string;
  buttonClick?: () => void;
  buttonLink?: string;
  externalLink?: boolean;
  noPrice?: boolean;
  noHeaderPrice?: boolean;
  titleLg?: boolean;
  timer?: string | number | Date;
  adaValue?: string;
  adaValue2?: string;
  title2?: string;
  noMargin?: boolean;
  walletMeta?: Cip30Wallet | null;
  walletBalance?: string | null;
  onWalletBtnClick?: () => void;
}

const Widget = (props: WidgetProps) => {
  const calculateTimeLeft = () => {
    let difference;
    difference = props.timer ? +new Date(props.timer) - +new Date() : -1;
    if (difference <= 0) {
      // Timer has expired
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeLeft());

  // Update timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.timer]); // Re-run useEffect when targetDate changes

  const { days, hours, minutes, seconds } = timeRemaining;
  return (
    <div className={styles.priceBtc}>
      {props.title && (
        <h3 className={props.titleLg ? styles.titleLg : styles.title}>
          {props.title}
        </h3>
      )}
      {!props.noHeaderPrice && props.token && (
        <div className={styles.headerPrice}>
          <div className={styles.token}>
            {props.icon && (
              <svg width="22" height="22" id="icon">
                <use href={props.icon}></use>
              </svg>
            )}
            {<p className={styles.tokenTitle}>{props.token} Price</p>}
          </div>
          {props.dailyChangePrice && (
            <p
              className={`${styles.changeDaily} ${
                props.dailyChangePrice?.startsWith("-") ? styles.negative : ""
              }`}
            >
              {props.dailyChangePrice?.startsWith("-") ? undefined : "+"}
              {props.dailyChangePrice}%
            </p>
          )}
        </div>
      )}
      {props.adaPrice && props.usdPrice ? (
        <div className={styles.priceGroup}>
          <div className={styles.adaPrice}>{props.adaPrice}</div>
          <p className={styles.usdPrice}>{props.usdPrice}</p>
        </div>
      ) : !props.noPrice ? (
        <>
          <div className={styles.loaderPrice}>
            <div className={styles.loader}></div>
          </div>
        </>
      ) : undefined}
      {props.timer && (
        <div className={styles.timer}>
          <div className={styles.time}>
            <p className={styles.timeValue}>{days}</p>
            <p className={styles.timeUnit}>Days</p>
          </div>
          <div className={styles.time}>
            <p className={styles.timeValue}>{hours}</p>
            <p className={styles.timeUnit}>Hours</p>
          </div>
          <div className={styles.time}>
            <p className={styles.timeValue}>{minutes}</p>
            <p className={styles.timeUnit}>Minutes</p>
          </div>
        </div>
      )}

      {props.adaValue && (
        <p className={styles.adaValue}>{props.adaValue} ADA</p>
      )}
      {props.title2 && <h3 className={styles.title}>{props.title2}</h3>}
      {props.adaValue2 && (
        <p className={styles.adaValue}>{props.adaValue2} ADA</p>
      )}
      {props.buttonTitle ? (
        props.buttonLink ? (
          <Link
            href={props.buttonLink}
            className={styles.btn}
            target={props.externalLink ? "_blank" : undefined}
          >
            {props.buttonTitle}
          </Link>
        ) : (
          <button onClick={props.buttonClick} className={styles.btn}>
            {props.buttonTitle}
          </button>
        )
      ) : undefined}
      {props.onWalletBtnClick ? (
        props.walletMeta ? (
          <div className={styles.balanceValue}>
            <svg width="25" height="25" id="icon">
              <use href={props.icon}></use>
            </svg>
            <p className={styles.text}>{props.token}</p>
            <p className={styles.value}>{props.walletBalance}</p>
          </div>
        ) : (
          <button className={styles.btn} onClick={props.onWalletBtnClick}>
            Connect Wallet
          </button>
        )
      ) : undefined}
      {!props.noMargin && <div className={styles.bottomMargin} />}
    </div>
  );
};