import styles from "../../styles/stake.module.scss";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { NumericFormat, numericFormatter } from "react-number-format";
import Head from "next/head";

export default function Stake() {
  const monthlyRewards = 4567;
  const maxAmount = 9999999;
  const [amount, setAmount] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(parseFloat(value.replace(/,/g, "")));
  };

  const handleMaxClick = () => {
    setAmount(maxAmount);
  };

  const handleStake = () => {
    // TODO
  };

  return (
    <>
      <Head>
        <title>Staking | anetaBTC</title>
      </Head>
      <main className={styles.stake}>
        <section>
          <h2>Stake Amount</h2>
          <div className={styles.inputRow}>
            <Image
              src="/images/logo/angel.png"
              alt="logo aneta"
              width={36}
              height={36}
              priority
            />
            <NumericFormat
              thousandSeparator
              allowNegative={false}
              value={amount}
              onChange={handleChange}
              type="text"
              placeholder="Enter stake amount"
              required
            />
            <button onClick={handleMaxClick}>Max</button>
          </div>
          <div className={styles.infoRow}>
            <svg height={20} width={20} className={styles.icon}>
              <use href="/images/icons/coins.svg#icon"></use>
            </svg>
            <p className={styles.description}>
              Your Estimated Monthly Rewards Valued in ADA*
            </p>
            <p className={styles.amount}>
              {numericFormatter(
                monthlyRewards.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                }),
                {}
              )}{" "}
              ADA
            </p>
          </div>
        </section>
        <button onClick={handleStake}>Stake</button>
        <div className={styles.comingSoon}>Coming Soon</div>
      </main>
    </>
  );
}
