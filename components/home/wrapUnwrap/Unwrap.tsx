import { useState, useEffect, useContext } from "react";
import useUnwrap, { UnwrapStage } from "../../../hooks/useUnwrap";
import styles from "../../../styles/wrapUnwrap.module.scss";
import UnwrapSuccessful from "./unwrap/UnwrapSuccessful";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import ConnectWallet from "../../partials/navbar/ConnectWallet";
import { formatAmount, validInput } from "../../../utils/format";
import useLucid from "../../../hooks/useLucid";
import { GlobalContext } from "../../GlobalContext";

const Unwrap = () => {
  const {
    unwrapFeeBtc,
    bridgeFee,
    unwrapFeeCardano,
    btcToBeReceived,
    amount,
    setAmount,
    unwrap,
    unwrapBtcDestination,
    setUnwrapBtcDestination,
    isLoading,
    unwrapStage,
    setUnwrapStage,
    networkFee,
    policyId,
    usdAmount,
    usdReceive,
  } = useUnwrap();

  const [balance, setBalance] = useState<null | string>(null);

  const { config } = useContext(GlobalContext);

  const networkMainnet: boolean = config.network === "Mainnet";

  const { walletMeta, address, walletAddress } = useCardanoWallet();
  //const { utxos, error, loading }= useFetchUtxo(address)
  const { getUtxos } = useLucid();

  const [isWalletShowing, setIsWalletShowing] = useState(false);

  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [checkBalance, setCheckBalance] = useState<boolean>(true);

  const [isHover, setIsHover] = useState(false);

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

  const getBalance = async () => {
    const utxos = await getUtxos();

    let sumBalance = 0;

    sumBalance = utxos.reduce((total, utxo) => {
      const amountForUnit = Number(utxo.assets[policyId]) ?? 0;

      if (amountForUnit) {
        const quantity = Number(amountForUnit);
        total += quantity;
      }
      return total;
    }, 0);
    setBalance(formatAmount(sumBalance / 100000000));
  };

  useEffect(() => {
    if (address !== "") {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (balance) {
      parseFloat(amount) > parseFloat(balance)
        ? setCheckBalance(false)
        : setCheckBalance(true);
    }
    if (amount !== "") {
      parseFloat(amount) >= (networkMainnet ? 0.02 : 0.001)
        ? setCheckInput(false)
        : setCheckInput(true);
    }
  }, [amount, balance, networkMainnet]);

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

  const handleBalance = () => {
    if (balance) {
      setAmount(balance);
    } else {
      setAmount("");
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector("input");
    inputElement?.addEventListener("wheel", handleWhell, { passive: false });
    return () => {
      inputElement?.removeEventListener("wheel", handleWhell);
    };
  }, []);

  const handleReset = () => {
    setAmount("");
    setUnwrapBtcDestination("");
  };

  return (
    <section className={styles.menu}>
      <p className={styles.titleSection}>Redeem BTC</p>

      {/* amount field  */}
      <div className={styles.inputAmount}>
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
              <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
            </svg>
            <p>cBTC</p>
          </div>
        </div>
        {usdAmount && (!walletMeta || checkBalance) && (
          <p className={`${styles.usdBtc}`}>{usdAmount}</p>
        )}

        {walletMeta && balance && (
          <div className={styles.balanceContainer}>
            {checkBalance ? (
              <p></p>
            ) : (
              <p className={`${styles.text} ${styles.insufficient}`}>
                Insufficient Funds
              </p>
            )}

            <div className={styles.balance}>
              <p className={styles.text}>
                Balance: {`${balance ? balance : 0}`}
              </p>
              {balance !== amount && Number(balance) > 0 && (
                <button className={styles.btn} onClick={handleBalance}>
                  Max
                </button>
              )}
            </div>
          </div>
        )}

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

      {/* source address  */}
      <div className={styles.inputAddress}>
        <input
          value={unwrapBtcDestination}
          onChange={(e) => setUnwrapBtcDestination(e.target.value)}
          type="text"
          placeholder="Enter your BTC address"
          required
        />
      </div>

      {/* fee */}
      <div className={`${styles.sectionFee} ${styles.unwrap}`}>
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
                    BTC + {unwrapFeeBtc}% of Total
                  </p>
                </div>
                <div className={styles.tooltipArrow}></div>
              </>
            )}
          </div>
        </div>

        <div className={styles.token}>
          <svg width="30" height="30" id="icon">
            <use href="/images/crypto/cbtc-logo.svg#Layer_1"></use>
          </svg>
          <p>{formatAmount(bridgeFee)}</p>
          <p>cBTC</p>
        </div>
      </div>

      {/* fee */}
      <div className={`${styles.sectionFee} ${styles.unwrapFee}`}>
        <div className={styles.token}>
          <svg width="30" height="30" id="icon">
            <use href="/images/crypto/cardano-logo.svg#Layer_1"></use>
          </svg>
          <p>{unwrapFeeCardano}</p>
          <p>ADA</p>
        </div>
      </div>

      {/* my receive amount  */}

      <div className={`${styles.sectionFee} ${styles.receiveAmount}`}>
        <div className={styles.bridge}>
          <p className={styles.title}>You Will Receive</p>
        </div>
        <div className={styles.token}>
          <svg width="30" height="30" id="icon">
            <use href="/images/crypto/bitcoin-logo.svg#Layer_1"></use>
          </svg>
          <p>{formatAmount(btcToBeReceived)}</p>
          <p>BTC</p>
        </div>
        {usdReceive && <p className={`${styles.usdReceive}`}>{usdReceive}</p>}
      </div>
      {/* final button  */}
      {walletMeta ? (
        <button
          disabled={
            !Boolean(amount) ||
            checkInput ||
            unwrapBtcDestination === "" ||
            !checkBalance ||
            walletAddress === "Wrong Network"
          }
          onClick={unwrap}
          className={styles.wrapBtn}
        >
          {isLoading ? <div className={styles.loader}></div> : undefined}
          {amount
            ? checkInput || !checkBalance
              ? "Invalid amount"
              : unwrapBtcDestination === ""
              ? "Enter an address"
              : walletAddress === "Wrong Network"
              ? "Wrong Network"
              : "Unwrap cBTC"
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

      {/* success modal  */}
      <UnwrapSuccessful
        isOpen={unwrapStage === UnwrapStage.Success}
        amount={amount}
        amountToReceive={btcToBeReceived}
        unwrapBtcDestination={unwrapBtcDestination}
        onClick={() => setUnwrapStage(UnwrapStage.NotStart)}
        onClose={() => setUnwrapStage(UnwrapStage.NotStart)}
        reset={handleReset}
      ></UnwrapSuccessful>
    </section>
  );
};

export default Unwrap;
