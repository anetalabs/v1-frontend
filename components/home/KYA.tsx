import { useEffect, useState } from "react";
import styles from "../../styles/kya.module.scss"


const KYA = (/* { isOpen, setIsOpen }: Props */) => {
  const [kyaApproved, setKyaApproved] = useState<boolean>(true);
  const closeModal = () => {
    setKyaApproved(true)
  };
  const acceptModal = () => {
    setKyaApproved(true)
    localStorage.setItem("kyaApproved", "true");
  };
  useEffect(() => {
    const kyaApproved = localStorage.getItem("kyaApproved");
    kyaApproved ? setKyaApproved(kyaApproved === "true") : setKyaApproved(false);
  }, []);
  return (
    <>
      {!kyaApproved && ( 
      <div className={styles.kycPopup}>
        <main className={styles.main}>
          <section className={styles.popUp}>
            <header className={styles.header}>
              <h2>Know Your Assumptions (KYA)</h2>
              <svg width="30" height="30" id="icon" onClick={closeModal}>
                <use href="/images/icons/x.svg#icon"></use>
              </svg>
            </header>
            <section className={styles.content}>
              <p className={styles.text}>This website (app.anetabtc.io) provides the means for users to interact with the anetaBTC protocol. The anetaBTC protocol operates as a financial protocol built  on top of the Cardano blockchain, operated in large part by smart contracts.</p>
              <h3 className={styles.subtitle}>By Accepting these KYA, you agree that:</h3>
              <ol>
                <li className={styles.list}>You will use app.anetabtc.io at your own risk;</li>
                <li className={styles.list}>Only YOU are responsible for your own assets;</li>
                <li className={styles.list}>The anetaBTC protocol and its smart contracts meet your expectations.</li>
              </ol>
              <p className={`${styles.text} ${styles.bold}`}>The anetaBTC team {"doesn't"} guarantee the absence of bugs and errors.<br/>app.anetabtc.io is without a Know Your Customer (KYC) process and can offer NO assistance if a user is hacked or cheated out of passwords, currency or private wallet keys.</p>
            </section>
            <button className={styles.btn}
            onClick={acceptModal}>I understand the risks and accept KYA</button>
          </section>
        </main>

      </div>
      )}
    </>
  );
};

export default KYA;
