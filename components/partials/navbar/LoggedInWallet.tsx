import { Cip30Wallet } from "@cardano-sdk/dapp-connector";
import Image from "next/image";
import { useState, useEffect } from "react";
import useCardanoWallet from "../../../hooks/useCardanoWallet";
import styles from "../../../styles/logged.module.scss"

interface Props {
  disconnectWallet: Function;
  walletMeta: Cip30Wallet;
}

const LoggedInWallet = ({ disconnectWallet, walletMeta }: Props) => {
  const { walletAddress } = useCardanoWallet();
  const [btnDisconect, setBtnDisconect] = useState(false);

  const handleAdrressClick = () => {
    btnDisconect ? setBtnDisconect(false) : setBtnDisconect(true);
  }

  useEffect(() => {
    if(btnDisconect){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest(`.${styles.loggedWallet}`) && (!target.closest(`.${styles.disconnect}`))){
          setBtnDisconect(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[btnDisconect])

  return (
    <div
      className={styles.loggedWallet}
      onClick={handleAdrressClick}
    >
      <Image src={walletMeta.icon} alt="Wallet image" width={20} height={20} />
      <p>
        {walletAddress}
      </p>
      {
        btnDisconect && (        
        <div
          className={styles.disconnect}
          onClick={() => disconnectWallet()}
        >
          Disconnect
        </div>)
      }
    </div>
  );
};

export default LoggedInWallet;
