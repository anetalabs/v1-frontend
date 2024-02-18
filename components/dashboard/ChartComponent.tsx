import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import styles from "../../styles/chartComponent.module.scss";
import { AnetaData } from "../../hooks/useAnetaData";

interface ChartProps {
  data: AnetaData[];
}

export default function ChartComponent(props: ChartProps) {
  const { data } = props;

  const initialDate = 0;
  const middelDate = Math.floor(data.length / 2);
  const finishDate = data.length - 1;

  return (
    <section className={styles.chartContainer}>
      <>
        <ResponsiveContainer width="100%" height={170}>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAneta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#0C8CE9" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0C8CE9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip cursor={false} content={<CustomTooltip />} />
            {/*           <XAxis tickLine={false} axisLine={{stroke: "#0C8CE9"}} /> */}
            <Area
              type="bumpX"
              dataKey="amount"
              stroke="#0C8CE9"
              fillOpacity={1}
              fill="url(#colorAneta)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className={styles.chartLegend}>
          <p className={styles.legendTitle}>{data[initialDate].date}</p>
          <p className={styles.legendTitle}>{data[middelDate].date}</p>
          <p className={styles.legendTitle}>{data[finishDate].date}</p>
        </div>
      </>
    </section>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.toolipContainer}>
        <p className={styles.label}>{`${payload[0].value} cBTC`}</p>
      </div>
    );
  }

  return null;
};
