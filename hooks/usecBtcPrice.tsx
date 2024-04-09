import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useCBtcPrice = () => {
  const { cBtcAda, setCBtcAda } = useContext(GlobalContext);

  const fetchCBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/cbtcprice");
      const data = await res.json();
      setCBtcAda(data.price.toString());
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
