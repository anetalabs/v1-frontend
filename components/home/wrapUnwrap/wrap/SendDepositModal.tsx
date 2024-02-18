import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import useLucid from "../../../../hooks/useLucid";
import { useTryCatch } from "../../../../hooks/useTryCatch";
import styles from "../../../../styles/sendDeposit.module.scss";
import QRCode from "react-qr-code";
import { AppContext } from "../../../../pages/_app";
import CredentialQR from "./CredentialQR";


interface Props {
  isOpen: boolean;
  amount: string;
  wrapDepositAddress: string;
  onClick: () => void;
  onClose: () => void;
  feesRecommended?: number;
}

export default function SendDepositModal({
  isOpen,
  amount,
  wrapDepositAddress,
  onClick,
  onClose,
  feesRecommended,
}: Props) {
  const [credentialHash, setCredentialHash] = useState("");

  const { getUserPaymentCredential } = useLucid();
  const { tryWithErrorHandler } = useTryCatch();

  useEffect(() => {
    if (isOpen) {
      tryWithErrorHandler(async () => {
        setCredentialHash(await getUserPaymentCredential());
      });
    }
  }, [isOpen, tryWithErrorHandler, getUserPaymentCredential]);

  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };

  const [copyCredential, setCopyCredential] = useState(false);
  const [copyAddress, setCopyAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCredential, setIsOpenCredential] = useState(false);

  const HandleCopyCredential = () => {
    navigator.clipboard.writeText(credentialHash)
    .then(() => {
      setCopyCredential(true);
      setTimeout(()=>{
        setCopyCredential(false);
    },1000);
    }).catch(err => {
      setCopyCredential(false);
    });
  };
  const HandleCopyAddress = () => {
    navigator.clipboard.writeText(wrapDepositAddress)
    .then(() => {
      setCopyAddress(true);
      setTimeout(()=>{
        setCopyAddress(false);
    },1000);
    }).catch(err => {
      setCopyAddress(false);
    });
  };

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(()=>{
      onClick();
      setIsLoading(false);
    },2000);
  }

  return (
    <>
      {
        isOpen && 
        <div className={styles.modal}>
          <main className={styles.main}>
            <section className={styles.popUp}>
              <header className={styles.header}>
                <svg width="24" height="24" id='icon' className={styles.close} onClick={onClose}>
                  <use href="/images/icons/x.svg#icon"></use>
                </svg>
                <svg width="24" height="24" id='icon'>
                  <use href='/images/crypto/bitcoin-logo.svg#Layer_1'></use>
                </svg>
                <h2>Wrap BTC</h2>
              </header>
              <section className={styles.body}>
                <div className={styles.titleBody}>
                  <h3>Using Moonshine Wallet</h3>
                  <h3>Send {amount} BTC</h3>
                </div>
                <div className={styles.warning}>
                  <p><span className={styles.attention}>Attention: </span>
                  Add the following Enterprise Address in the “Message (Optional)” field of your Moonshine Wallet before sending this deposit.</p>
                  <p>The Enterprise Address of the connected wallet is: </p>
                </div>
                <div className={styles.credentialGroup}>
                  <div className={styles.credential} onClick={HandleCopyCredential}>
                  {copyCredential && (<p className={styles.copied}>Copied</p>)}
                    <p>{credentialHash}</p>
                    {state?.darkMode ? (
                    <Image src='/images/icons/copy-dark.png' width={14} height={14} alt='copy' className={styles.icon}/>
                    ): (
                    <Image src='/images/icons/copy-light.png' width={14} height={14} alt='copy' className={styles.icon}/>
                    )}
                  </div>
                  <div className={styles.credentialQr} onClick={() => setIsOpenCredential(true)}>
                      <svg
                        width="25"
                        height="25"
                        className={styles.icon}
                      >
                        <use href="/images/icons/qr-code.svg#icon"></use>
                      </svg>
                  </div>
                </div>

                <div className={styles.text}>
                  <p>
                  You can only mint cBTC to an Enterprise Address. If you do not add it into the message field ( OP_RETURN ) of your BTC transaction, you will not receive cBTC in your Cardano wallet.
                  </p>
                  <p className={styles.parragraph}>
                  Then, in a single transaction, send {amount} BTC to:
                  </p>
                  {
                    feesRecommended && (
                    <p><span className={styles.attention}>Current min. recommended BTC tx fee: </span>{feesRecommended} sat/B</p>)
                  }

                </div>
                <div className={styles.qr}>
                <div style={{ height: "auto", margin: "auto", width: "100%", padding: "10px"}}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={wrapDepositAddress}
                  viewBox={`0 0 256 256`}
                  bgColor={`#FFFFFF`}
                  />
                </div>
              </div>
              <div className={styles.address} onClick={HandleCopyAddress}>
                  <p>{wrapDepositAddress}</p>
                  {state?.darkMode ? (
                  <Image src='/images/icons/copy-dark.png' width={14} height={14} alt='copy' className={styles.icon}/>
                  ): (
                  <Image src='/images/icons/copy-light.png' width={14} height={14} alt='copy' className={styles.icon}/>
                  )}
                  {copyAddress && (<p className={styles.copied}>Copied</p>)}
              </div>
              <div className={styles.text}>
                  <p className={styles.note}>
                  <span>Note:</span> Payments may take several hours to confirm. {`Don't`} worry, your funds are safe.
                  </p>
              </div>  

              <button onClick={handleClick} className={styles.wrapBtn}>
              {isLoading ? (<div className={styles.loader}></div>):(undefined)}
                I have sent my deposit
              </button>
              </section>
              {
                isOpenCredential && 
                  <div className={styles.credentialModal}>
                    <CredentialQR closeModal={() => setIsOpenCredential(false)} credentialHash={credentialHash} />
                  </div>
              }
            </section>
          </main>          
        </div>


      }
    </>
  );
}
