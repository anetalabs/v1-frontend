import { useEffect, useState } from "react";
import styles from "../../styles/widget.module.scss";
import Link from "next/link";
import { Cip30Wallet } from "@cardano-sdk/dapp-connector";
import useWindowSize from "../../hooks/useResponsive";
import { classNames } from "../../utils/Classnames";
import Tooltip from "../Tooltip";

interface WidgetProps {
  dailyChangePrice?: string;
  adaPrice?: string;
  usdPrice?: string;
  token?: string;
  icon?: string;
  title?: string;
  buttonTitle?: string;
  buttonClick?: () => void;
  buttonDisabled?: boolean;
  buttonLink?: string;
  externalLink?: boolean;
  headerButtonTitle?: string;
  headerButtonClick?: (() => void) | string;
  noPrice?: boolean;
  noHeaderPrice?: boolean;
  titleLg?: boolean;
  titleLeft?: boolean;
  titleCenter?: boolean;
  timerStart?: string | number | Date;
  currentDate?: string | number | Date;
  timerInterval?: number;
  text?: string;
  textLg?: boolean;
  text2?: string;
  title2?: string;
  noMargin?: boolean;
  walletMeta?: Cip30Wallet | null;
  walletBalance?: string | null;
  onWalletBtnClick?: () => void;
  colSpan?: boolean;
  colSpanSm?: boolean;
  order?: number;
  paddingTop?: string;
  tooltip?: string;
  titleTooltip?: string;
  title2Tooltip?: string;
}

const Widget = (props: WidgetProps) => {
  const { width } = useWindowSize();
  const isMobile = width <= 550;
  const calculateTimeLeft = () => {
    const intervalDays = (props.timerInterval ?? 5) * 24 * 60 * 60 * 1000;
    const currentTime = props.currentDate
      ? new Date(props.currentDate)
      : new Date();
    const difference = props.timerStart
      ? +new Date(
          intervalDays -
            (Math.abs(+currentTime - +new Date(props.timerStart)) %
              intervalDays)
        )
      : -1;

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
  }, [props.timerStart]); // Re-run useEffect when targetDate changes

  const { days, hours, minutes, seconds } = timeRemaining;
  return (
    <div
      className={
        (isMobile
          ? props.colSpanSm
            ? styles.colSpan2
            : styles.colSpan1
          : props.colSpan
          ? styles.colSpan5
          : styles.colSpan3) +
        " " +
        styles.widget +
        " " +
        (props.colSpanSm ? styles.colSpanSm : "")
      }
      style={{
        order: isMobile && props.order ? props.order : undefined,
        paddingTop: props.paddingTop ?? undefined,
      }}
    >
      {props.title && (
        <div
          className={classNames(
            props.titleLg ? styles.titleLg : styles.title,
            props.titleLeft ? styles.titleLeft : "",
            props.titleCenter ? styles.titleCenter : ""
          )}
        >
          <div className={styles.titleWrapper}>
            <span>{props.title}</span>
            {props.titleTooltip && (
              <Tooltip
                content={props.titleTooltip}
                position={isMobile ? "left" : "top"}
              >
                i
              </Tooltip>
            )}
          </div>
          {props.headerButtonTitle && (
            <div className={styles.btnGroup}>
              {typeof props.headerButtonClick === "string" ? (
                <Link
                  className={styles.btnBtc}
                  href={props.headerButtonClick}
                  target="_blank"
                >
                  <span className={styles.btnText}>
                    {props.headerButtonTitle}
                  </span>
                  <svg width="12" height="12" id="icon" className={styles.icon}>
                    <use href="/images/icons/arrow-right.svg#icon"></use>
                  </svg>
                </Link>
              ) : (
                <button
                  className={styles.btnBtc}
                  onClick={props.headerButtonClick}
                >
                  <span className={styles.btnText}>
                    {props.headerButtonTitle}
                  </span>
                  <svg width="12" height="12" id="icon" className={styles.icon}>
                    <use href="/images/icons/arrow-right.svg#icon"></use>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
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
      {props.timerStart && (
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

      {props.text ? (
        props.text !== "loading" ? (
          <p className={props.textLg ? styles.valueTextLg : styles.valueText}>
            {props.text}
          </p>
        ) : (
          <div className={styles.loaderPrice}>
            <div className={styles.loader}></div>
          </div>
        )
      ) : undefined}
      {props.title2 && (
        <div
          className={classNames(props.titleLg ? styles.titleLg : styles.title)}
        >
          <div className={styles.titleWrapper}>
            <span>{props.title2}</span>
            {props.title2Tooltip && (
              <Tooltip
                content={props.title2Tooltip}
                position={isMobile ? "left" : "top"}
              >
                i
              </Tooltip>
            )}
          </div>
        </div>
      )}
      {props.text2 ? (
        props.text2 !== "loading" ? (
          <p className={styles.valueText}>{props.text2}</p>
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
            className={
              styles.btn + " " + (props.buttonDisabled ? styles.disabled : "")
            }
            target={props.externalLink ? "_blank" : undefined}
          >
            {props.buttonTitle}
          </Link>
        ) : (
          <button
            disabled={props.buttonDisabled}
            onClick={props.buttonClick}
            className={styles.btn}
          >
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
      {props.tooltip && (
        <div className={styles.tooltipWrapper}>
          <Tooltip content={props.tooltip} position={"top"}>
            i
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Widget;
