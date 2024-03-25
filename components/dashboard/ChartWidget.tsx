import { AnetaData } from "../../hooks/useAnetaData";
import ChartComponent from "./ChartComponent";
import styles from "../../styles/chartWidget.module.scss";
import Link from "next/link";

interface ChartWidgetProps {
  title: string;
  value: string;
  token: string;
  data?: AnetaData[];
  buttonTitle?: string;
  onButtonClick?: string | (() => void);
}

const ChartWidget = (props: ChartWidgetProps) => {
  return (
    <div className={styles.chartWidget}>
      <div className={styles.headerChart}>
        <div className={styles.valuesGroup}>
          <h2 className={styles.titleChart}>{props.title}</h2>
          <div className={styles.tokenChart}>
            {props.value === "loading" ? (
              <div className={styles.value}>
                <div className={styles.loader}></div>
              </div>
            ) : (
              <h3 className={styles.tokenTitle}>
                {props.value} {props.token}
              </h3>
            )}
          </div>
        </div>
        {props.buttonTitle && (
          <div className={styles.btnGroup}>
            {typeof props.onButtonClick === "string" ? (
              <Link
                className={styles.btnBtc}
                href={props.onButtonClick}
                target="_blank"
              >
                <span className={styles.btnText}>{props.buttonTitle}</span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </Link>
            ) : (
              <button className={styles.btnBtc} onClick={props.onButtonClick}>
                <span className={styles.btnText}>{props.buttonTitle}</span>
                <svg width="12" height="12" id="icon" className={styles.icon}>
                  <use href="/images/icons/arrow-right.svg#icon"></use>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      {props.data ? (
        <ChartComponent
          data={props.data}
          height={70}
          suffix={props.token}
          hideLegends
        />
      ) : (
        <div className={styles.loaderChart}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};

export default ChartWidget;
