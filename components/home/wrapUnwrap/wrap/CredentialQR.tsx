import QRCode from "react-qr-code";
import styles from "../../../../styles/sendDeposit.module.scss";


interface Props {
  closeModal: () => void;
  credentialHash: string;
}

export default function credentialQR({
  credentialHash,
  closeModal,
}: Props) {
  return (
    <div className={styles.popupContentCredential}>
      <svg width="24" height="24" id='icon' className={styles.close} onClick={closeModal}>
        <use href="/images/icons/x.svg#icon"></use>
      </svg>
      <h1 className={styles.title}>Enterprise Address</h1>
      <div className={styles.qr}>
        <div style={{ height: "auto", margin: "auto", width: "100%", padding: "10px"}}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={credentialHash}
            viewBox={`0 0 256 256`}
            bgColor={`#FFFFFF`}
          />
        </div>
      </div>
    </div>
  );

}
