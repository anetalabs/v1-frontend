import { AnetaData } from "../../hooks/useAnetaData";
import ChartComponent from "./ChartComponent";
import styles from "../../styles/chartWidget.module.scss";
import { numericFormatter } from "react-number-format";

interface ChartWidgetProps {
  title: string;
  amount: number;
  suffix: string;
  data?: AnetaData[];
  hasFilter?: boolean;
  onFilterBtnClick?: () => void;
}

const ChartWidget = (props: ChartWidgetProps) => {
  return (
    <div className={styles.chartWidget}>
      <div className={styles.headerChart}>
        <div className={styles.valuesGroup}>
          <h2 className={styles.titleChart}>{props.title}</h2>
          <div className={styles.tokenChart}>
            <h3 className={styles.tokenTitle}>
              {numericFormatter(
                props.amount.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                }),
                {}
              )}{" "}
              {props.suffix}
            </h3>
          </div>
        </div>
        {props.hasFilter && (
          <div className={styles.btnGroup}>
            <button className={styles.btnBtc} onClick={props.onFilterBtnClick}>
              <span className={styles.btnText}>All Time</span>
              {/* <svg width="12" height="12" id="icon" className={styles.icon}>
                <use href="/images/icons/arrow-right.svg#icon"></use>
              </svg> */}
            </button>
          </div>
        )}
      </div>
      {props.data ? (
        <ChartComponent
          data={props.data}
          height={70}
          suffix={props.suffix}
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
