import { useEffect, useState, Fragment } from "react";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import styles from "../../../styles/connectWallet.module.scss"
import { CONSTANTS } from "../../../utils/constants";
import Image from "next/image";
import { CardanoWalletType } from "../../../types/wallets";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ConnectWallet = ({ isOpen, setIsOpen }: Props) => {
  const { connectWallet } = useCardanoWallet();
  const [cardanoWallets, setCardanoWallets] = useState<CardanoWalletType[]>(Object.values(CONSTANTS.CARDANO_WALLETS));

  const handleConnectWallet = (cardanoWalletName: string) => {
    setIsOpen(false);
    connectWallet(cardanoWalletName);
  };

  
  useEffect(() => {
    if(isOpen){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest(`.${styles.main}`)){
          setIsOpen(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[isOpen, setIsOpen])

  return (
    <>
      {
        isOpen && 
        <div className={styles.walletPopup}>
          <section className={styles.main}>
            <div className={styles.popUp}>
              <header className={styles.header}>
                <p>Connect wallet</p>
                  <svg width="20" height="20" id="icon" onClick={() => setIsOpen(false)}>
                    <use href="/images/icons/x.svg#icon"></use>
                  </svg>
              </header>
              <div className={styles.walletsList}>
              {cardanoWallets.map((item: CardanoWalletType) => {
                      const cardano = window.cardano;
                      return (
                      <Fragment key={item.name}>
                      {
                        (cardano == null || cardano[item.wallet] == null) ? (
                          <Link
                          className={styles.item}
                          href={item.link} target="_blank"
                          rel="noreferrer"
                        >                       
                          <div className={styles.name}>
                            <h2>{item.name}</h2>
                            {
                            item.mobile && <p>(mobile)</p>
                            }
                            <p className={styles.link}>Install</p>
                          </div>
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                          />
                        </Link>
                        ): (
                          <div
                          key={item.name}
                          onClick={() => handleConnectWallet(item.name)}
                          className={styles.item}
                        >
                          <div className={styles.name}>
                            <h2>{item.name}</h2>
                          </div>
                          <Image
                            src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        )
                      }
                    </Fragment>)}                
                )}
              </div>
            </div>
          </section>
        </div>
      }
    </>
  );
};

export default ConnectWallet;
