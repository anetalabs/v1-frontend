import { useState, useEffect, useCallback } from "react";
import { formatAmount } from "../utils/format";

const useCBtcPrice = () => {
  const [cBtcAda, setCBtcAda] = useState<string | undefined>();

  const fetchCBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/cbtcpool");
      const data = await res.json();

      const price = (data.lockedX.amount / data.lockedY.amount) * 100;
      setCBtcAda(formatAmount(price));
      
    } catch (error) {
      console.error("Error fetching cBTC Price:", error);
    }
  }, []);

  useEffect(() => {
    fetchCBtcPrice();
  }, [fetchCBtcPrice]);

  return { cBtcAda };
};

export default useCBtcPrice;