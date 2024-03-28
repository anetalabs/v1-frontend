import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useConvertPrice = () => {
  const { usdCNeta, setUsdCNeta, usdErg, setUsdErg } =
    useContext(GlobalContext);

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

  const fetchErgPrice = useCallback(async () => {
    try {
      const res = await fetch(
        "/api/convertprice?symbol=erg&amount=1&convert=USD"
      );
      const data = await res.json();

      setUsdErg(data.price);
    } catch (error) {
      console.error("Error fetching ERGO Price:", error);
    }
  }, [setUsdErg]);

  useEffect(() => {
    if (!usdCNeta) fetchCNetaPrice();
  }, [fetchCNetaPrice, usdCNeta]);

  useEffect(() => {
    if (!usdErg) fetchErgPrice();
  }, [fetchErgPrice, usdErg]);

  return { usdCNeta };
};

export default useConvertPrice;
