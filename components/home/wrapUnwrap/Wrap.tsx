import { useState, useEffect, useContext } from "react";
import useWrap, { WrapStage } from "../../../hooks/useWrap";
import styles from "../../../styles/wrapUnwrap.module.scss";
import DepositConfirmModal from "./wrap/DepositConfirmModal";
import SendDepositModal from "./wrap/SendDepositModal";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import ConnectWallet from "../../partials/navbar/ConnectWallet";
import { formatAmount, validInput } from "../../../utils/format";
import { GlobalContext } from "../../GlobalContext";

const Wrap = () => {
  const {
    amount,
    setAmount,
    wrapFeeBtc,
    btcToBeReceived,
    bridgeFee,
    wrapDepositAddress,
    wrap,
    isLoading,
    wrapStage,
    setWrapStage,
    networkFee,
    feesRecommended,
    usdAmount,
    usdReceive,
  } = useWrap();

  const { walletMeta, walletAddress } = useCardanoWallet();
  const [isWalletShowing, setIsWalletShowing] = useState(false);

  const [isHover, setIsHover] = useState(false);

  const [checkInput, setCheckInput] = useState<boolean>(false);

  const { config } = useContext(GlobalContext);
  const networkMainnet: boolean = config.network === "Mainnet";

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith(".")) {
      value = "0" + value;
    }
    if (validInput(value)) {
      setAmount(value);
    }
    if (networkMainnet) {
      parseFloat(value) < 0.02 ? setCheckInput(true) : setCheckInput(false);
    } else {
      parseFloat(value) < 0.001 ? setCheckInput(true) : setCheckInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
    }
  };

  const handleWhell = (e: WheelEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const inputElement = document.querySelector("input");
    inputElement?.addEventListener("wheel", handleWhell, { passive: false });
    return () => {
      inputElement?.removeEventListener("wheel", handleWhell);
    };
  }, []);

  return (
    <section className={styles.menu}>
      <p className={styles.titleSection}>Mint cBTC</p>
      {/* Wrap BTC Input */}
      <div className={`${styles.inputAmount} ${styles.wrap}`}>
        <input
          placeholder="0"
          value={amount}
          type="number"
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.token}>
          <div className={styles.tokenName}>
            <svg width="30" height="30" id="icon">
              <use href="/images/crypto/bitcoin-logo.svg#Layer_1"></use>
            </svg>
            <p>BTC</p>
          </div>
        </div>
        {usdAmount && <p className={`${styles.usdBtc}`}>{usdAmount}</p>}
        {checkInput ? (
          <div className={styles.warning}>
            <svg width="14" height="14" id="icon">
              <use href="/images/icons/exclamation-circle-fill.svg#icon"></use>
            </svg>
            <p>
              You can redeem a minimum of {networkMainnet ? "0.02" : "0.001"}{" "}
              BTC.
            </p>
          </div>
        ) : undefined}
      </div>
      {/* fee */}
      <section className={`${styles.sectionFee} ${styles.wrap}`}>
        <div className={styles.bridge}>
          <p className={styles.title}>Bridge Fee (Estimated)</p>
          <div
            className={styles.tooltip}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <svg width="14" height="14" id="icon" className={styles.icon}>
              <use href="/images/icons/question-circle.svg#icon"></use>
            </svg>
            {isHover && (
              <>
                <div className={styles.tooltipContent}>
                  <p>
                    {networkFee === ""
                      ? " ... "
                      : formatAmount(0.0005 + Number(networkFee))}{" "}
                    BTC + {wrapFeeBtc}% of Total
                  </p>
                </div>
                <div className={styles.tooltipArrow}></div>
              </>
            )}
          </div>
        </div>

        <div className={styles.token}>
          <p>{formatAmount(bridgeFee)}</p>
          <p>BTC</p>
          <svg width="30" height="30" id="icon">
            <use href="/images/crypto/bitcoin-logo.svg#Layer_1"></use>
          </svg>
        </div>
      </section>
      {/* my receive amount  */}
      <section className={`${styles.sectionFee} ${styles.receiveAmount}`}>
        <div className={styles.bridge}>
          <p className={styles.title}>You Will Receive</p>
        </div>
        <div className={styles.token}>
          <p>{formatAmount(btcToBeReceived)}</p>
          <p>cBTC</p>
          <svg width="30" height="30" id="icon">
            <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
          </svg>
        </div>
        {usdReceive && <p className={`${styles.usdReceive}`}>{usdReceive}</p>}
      </section>

      {walletMeta ? (
        <button
          disabled={
            !Boolean(amount) || checkInput || walletAddress === "Wrong Network"
          }
          onClick={wrap}
          className={styles.wrapBtn}
        >
          {isLoading ? <div className={styles.loader}></div> : undefined}

          {amount
            ? checkInput
              ? "Invalid amount"
              : walletAddress === "Wrong Network"
                ? "Wrong Network"
                : "Wrap BTC"
            : "Enter an amount"}
        </button>
      ) : (
        <>
          <button
            className={styles.wrapBtn}
            onClick={() =>
              isWalletShowing
                ? setIsWalletShowing(false)
                : setIsWalletShowing(true)
            }
          >
            Connect Wallet
          </button>
          <ConnectWallet
            isOpen={isWalletShowing}
            setIsOpen={setIsWalletShowing}
          />
        </>
      )}

      <SendDepositModal
        isOpen={wrapStage === WrapStage.Pending}
        amount={amount}
        wrapDepositAddress={wrapDepositAddress}
        onClick={() => setWrapStage(WrapStage.Sent)}
        onClose={() => setWrapStage(WrapStage.NotStarted)}
        feesRecommended={feesRecommended}
      ></SendDepositModal>
      <DepositConfirmModal
        isOpen={wrapStage === WrapStage.Sent}
        amount={amount}
        amountToReceive={btcToBeReceived}
        onClick={() => setWrapStage(WrapStage.NotStarted)}
        onClose={() => setWrapStage(WrapStage.NotStarted)}
        resetAmount={() => setAmount("")}
      ></DepositConfirmModal>
    </section>
  );
};

export default Wrap;
