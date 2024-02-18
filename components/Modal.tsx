import { useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import styles from "../styles/modal.module.scss"

export default function Modal() {
  const { modalState, setModalState } = useContext(GlobalContext);

  const closeModal = useCallback(() => {
    setModalState({
      ...modalState,
      open: false,
    });
  
  },[modalState, setModalState])

  const { open: isOpen, text, type } = modalState;

useEffect(() => {
  if(isOpen){
  }
  
},[isOpen, closeModal])

  function Icon() {
    switch (type) {
      case "error":
        return (
          <svg width="50" height="50" className={`${styles.icon} ${styles.error}`}>
            <use href="/images/icons/x-circle-fill.svg#icon"></use>
          </svg>
        );
      case "info":
        return (
          <svg width="50" height="50" className={`${styles.icon} ${styles.info}`}>
            <use href="/images/icons/info-circle-fill.svg#icon"></use>
          </svg>
        );
      case "success":
        return (
          <svg width="50" height="50" className={`${styles.icon} ${styles.success}`}>
            <use href="/images/icons/check-circle-fill.svg#icon"></use>
          </svg>
        );
      default:
        return (
          <svg width="50" height="50" className={`${styles.icon} ${styles.error}`}>
            <use href="/images/icons/x-circle-fill.svg#icon"></use>
          </svg>
        );  
    }
  }

  return (
    <>
    {
      isOpen && (
      <section onClick={closeModal} className={styles.modal}>
        <div className={styles.main}>
          <div className={styles.popUp}>
            <Icon />
            {text}
          </div>
        </div>
      </section>
      )
    }
    </>
  );
}
