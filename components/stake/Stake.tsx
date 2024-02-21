import { Fragment, useEffect, useState, useContext } from "react";
import styles from "../../styles/wrapUnwrap.module.scss";

const Stake = () => {
  const [tabName, setTabName] = useState<string>("Wrap");

  return (
    <div
      className={`${styles.wrapUnwrap} ${
        tabName === "Wrap" ? `${styles.wrap}` : `${styles.unwrap}`
      }`}
    >
      {/* {tabName == "Unwrap" ? <Unwrap /> : <Wrap />} */}
    </div>
  );
};

export default Stake;
