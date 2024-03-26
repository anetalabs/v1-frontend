import { useState, useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useBitcoinPrice = () => {
  const { usdBtc, setUsdBtc, dailyChangeBtc, setDailyChangeBtc } =
    useContext(GlobalContext);

  const fetchBitcoinPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinprice");
      const data = await res.json();

      setUsdBtc(data.price);
      setDailyChangeBtc(data.dailyChange);
    } catch (error) {
      console.error("Error fetching Bitcoin Price:", error);
    }
  }, [setUsdBtc, setDailyChangeBtc]);

  useEffect(() => {
    if (!usdBtc || !dailyChangeBtc) fetchBitcoinPrice();
  }, [fetchBitcoinPrice, usdBtc, dailyChangeBtc]);

  return { usdBtc, dailyChangeBtc };
};

export default useBitcoinPrice;
