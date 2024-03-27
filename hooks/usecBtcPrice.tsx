import { useState, useEffect, useCallback, useContext } from "react";
import { formatAmount } from "../utils/format";
import { GlobalContext } from "../components/GlobalContext";

const useCBtcPrice = () => {
  const { cBtcAda, setCBtcAda } = useContext(GlobalContext);

  const fetchCBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/cbtcpool");
      const data = await res.json();

      const price = (data.lockedX.amount / data.lockedY.amount) * 100;
      setCBtcAda(formatAmount(price));
    } catch (error) {
      console.error("Error fetching cBTC Price:", error);
    }
  }, [setCBtcAda]);

  useEffect(() => {
    if (!cBtcAda) fetchCBtcPrice();
  }, [fetchCBtcPrice, cBtcAda]);

  return { cBtcAda };
};

export default useCBtcPrice;
