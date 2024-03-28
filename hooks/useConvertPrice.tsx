import { useState, useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useConvertPrice = () => {
  const { usdCNeta, setUsdCNeta } = useContext(GlobalContext);

  const fetchCNetaPrice = useCallback(async () => {
    try {
      const res = await fetch(
        "/api/convertprice?symbol=cneta&amount=1&convert=USD"
      );
      const data = await res.json();

      setUsdCNeta(data.price);
    } catch (error) {
      console.error("Error fetching cNETA Price:", error);
    }
  }, [setUsdCNeta]);

  useEffect(() => {
    if (!usdCNeta) fetchCNetaPrice();
  }, [fetchCNetaPrice, usdCNeta]);

  return { usdCNeta };
};

export default useConvertPrice;
