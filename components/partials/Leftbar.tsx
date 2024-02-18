import { Fragment, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/leftNav.module.scss";
import { CardanoNetwork } from "../../utils/api";
import { navigationLeftbar, socialLinks } from "../../utils/leftbar";
import { GlobalContext } from "../GlobalContext";

const Leftbar = () => {
  const router = useRouter();

  const { config } = useContext(GlobalContext);

  return (
    <div className={styles.leftNav}>
      <div className={styles.network}>
        {config.network !== CardanoNetwork.Mainnet ? (
          <p>Testnet</p>
        ) : (
          <p>Mainnet</p>
        )}
      </div>

      <div className={styles.navigationContainer}>
        {navigationLeftbar.map((item) => (
          <Fragment key={item.name}>
            <Link
              href={item.href}
              className={`${styles.item} ${
                router.pathname == item.href ? styles.active : ""
              }`}
              target={item.href.startsWith("http") ? "_blank" : ""}
              rel={item.href.startsWith("http") ? "noreferrer" : ""}
            >
              <svg width="20" height="20" className={styles.icon}>
                <use href={item.icon}></use>
              </svg>
              <p className={styles.name}>{item.name}</p>
            </Link>
          {
            item.name === "Dashboard" && <div className={styles.line}></div>
          }
          
          </Fragment>

        ))}
        
        <div className={styles.social}>
          {socialLinks.map((item, i) => {
            return (
              <Fragment key={i}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  <svg width="16" height="16" className={styles.icon}>
                    <use href={item.icon}></use>
                  </svg>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
