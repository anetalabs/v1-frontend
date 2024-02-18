import Image from "next/image";
//import WrapUnwrapModal from "../WrapUnwrapModal";
import styles from "../../../../styles/depositConfirm.module.scss"
import { formatAmount } from "../../../../utils/format";

interface Props {
  isOpen: boolean;
  amount: string;
  amountToReceive: number;
  onClick: () => void;
  onClose: () => void;
  resetAmount: () => void;
}

export default function DepositConfirmModal({
  isOpen,
  amount,
  amountToReceive,
  onClick,
  onClose,
  resetAmount,
}: Props) {


  const handleClick = () => {
      onClick();
      resetAmount();
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
                  <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
                </svg>
                <h2>Wrap BTC</h2>
              </header>
              <section className={styles.body}>
                <div className={styles.result}>
                  <div className={styles.group}>
                    <div className={styles.name}>
                      <svg width="20" height="20" id='icon' >
                        <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>BTC</h3>
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
                        <use href='/images/crypto/cbtc-logo.svg#Layer_1'></use>
                      </svg>
                      <h3>cBTC</h3>
                    </div>
                    <div className={styles.value}>
                      <p>{formatAmount(amountToReceive)}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.text}>
                  <p>
                  Thank you for sending your BTC Deposit. cBTC will be sent to your Cardano wallet once your BTC deposit is confirmed. This process may take several hours.
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
