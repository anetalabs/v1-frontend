import { useEffect, useState } from "react";
import styles from "../../styles/widget.module.scss";
import Link from "next/link";
import { Cip30Wallet } from "@cardano-sdk/dapp-connector";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timer]); // Re-run useEffect when targetDate changes

  const { days, hours, minutes, seconds } = timeRemaining;
  return (
    <div className={styles.widget}>
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
        <div className={styles.loaderPrice}>
          <div className={styles.loader}></div>
        </div>
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
      {props.adaValue2 ? (
        props.adaValue2 !== "loading" ? (
          <p className={styles.adaValue}>{props.adaValue2} ADA</p>
        ) : (
          <div className={styles.loaderPrice}>
            <div className={styles.loader}></div>
          </div>
        )
      ) : undefined}
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
      {props.walletMeta ? (
        <div className={styles.balanceValue}>
          <svg width="25" height="25" id="icon">
            <use href={props.icon}></use>
          </svg>
          <p className={styles.text}>{props.token}</p>
          {props.walletBalance ? (
            <p className={styles.value}>{props.walletBalance}</p>
          ) : (
            <div className={styles.loaderPrice}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      ) : undefined}
      {!props.noMargin && <div className={styles.bottomMargin} />}
    </div>
  );
};

export default Widget;
