import Image from "next/image";
import styles from "../../../../styles/unWrapConfirm.module.scss";
import { formatAmount } from "../../../../utils/format";

interface Props {
  isOpen: boolean;
  amount: string;
  amountToReceive: number;
  unwrapBtcDestination: string;
  onClick: () => void;
  onClose: () => void;
  reset: () => void;
}



export default function UnwrapSuccessful({
  isOpen,
  amount,
  amountToReceive,
  unwrapBtcDestination,
  onClick,
  onClose,
  reset,
}: Props) {


  const handleClick = () => {
    onClick();
    reset();
}


  return (
    <>
      {
        isOpen &&
        <div className={styles.modal}>
          <main className={styles.main}>
            <section className={styles.popUp}>
              <header className={styles.header}>
                <svg width="24" height="24" id='icon'>
                  <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
                </svg>
                <h2>Unwrap cBTC</h2>
              </header>
              <section className={styles.body}>
                <div className={styles.result}>
                  <div className={styles.group}>
                    <div className={styles.name}>
                      <svg width="20" height="20" id='icon' >
                        <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>cBTC</h3>
                    </div>
                    <div className={styles.value}>
                      <p>{amount}</p>
                    </div>
                  </div>
                  <div className={styles.arrow}>
                    <Image src='/images/icons/arrow_blue.png' width={83} height={24} alt="arrow" />
                  </div>
                  <div className={styles.group}>
                    <div className={styles.name}>
                      <svg width="20" height="20" id='icon' >
                        <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>BTC</h3>
                    </div>
                    <div className={styles.value}>
                      <p>{formatAmount(amountToReceive)}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.address}>
                  <p>BTC Destination Address:</p>
                  <p>{unwrapBtcDestination}</p>
                </div>


                <div className={styles.text}>
                  <p>
                  Your cBTC has been sent for unwrap. BTC will be sent to your BTC wallet shortly. This may take several hours. {`Don't`} worry, your funds are safe.
                  </p>
                  <p className={styles.parragraph}>
                  If you need support, send your BTC transaction ID and your Cardano address and we will help you.
                  </p>
                </div>


                <button onClick={handleClick} className={styles.wrapBtn}>
                  Close
                </button>
              </section>
            </section>

          </main>
        </div>
      }
    </>

  );
}
