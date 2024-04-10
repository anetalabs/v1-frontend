import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const usePrice = () => {
  const {
    usdCNeta,
    setUsdCNeta,
    dailyChangeCNeta,
    setDailyChangeCNeta,
    usdAda,
    setUsdAda,
    dailyChangeAda,
    setDailyChangeAda,
    usdErg,
    setUsdErg,
    dailyChangeErg,
    setDailyChangeErg,
    usdBtc,
    setUsdBtc,
    dailyChangeBtc,
    setDailyChangeBtc,
    cBtcAda,
    setCBtcAda,
    dailyChangeCBtc,
    setDailyChangeCBtc,
  } = useContext(GlobalContext);

  const fetchCNetaPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/price?symbol=cneta&convert=USD");
      const data = await res.json();

      setUsdCNeta(data.price.toString());
      setDailyChangeCNeta(data.dailyChange.toString());
    } catch (error) {
      console.error("Error fetching cNETA Price:", error);
    }
  }, [setUsdCNeta, setDailyChangeCNeta]);

  const fetchAdaPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/price?symbol=ada&convert=USD");
      const data = await res.json();

      setUsdAda(data.price.toString());
      setDailyChangeAda(data.dailyChange.toString());
    } catch (error) {
      console.error("Error fetching ADA Price:", error);
    }
  }, [setUsdAda, setDailyChangeAda]);

  const fetchErgPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/price?symbol=erg&convert=USD");
      const data = await res.json();

      setUsdErg(data.price.toString());
      setDailyChangeErg(data.dailyChange.toString());
    } catch (error) {
      console.error("Error fetching ERGO Price:", error);
    }
  }, [setUsdErg, setDailyChangeErg]);

  const fetchBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/price?symbol=btc&convert=USD");
      const data = await res.json();

      setUsdBtc(data.price.toString());
      setDailyChangeBtc(data.dailyChange.toString());
    } catch (error) {
      console.error("Error fetching Bitcoin Price:", error);
    }
  }, [setUsdBtc, setDailyChangeBtc]);

  const fetchCBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/cbtcprice");
      const data = await res.json();
      setCBtcAda(data.price.toString());
      setDailyChangeCBtc(data.dailyChange.toString());
    } catch (error) {
      console.error("Error fetching cBTC Price:", error);
    }
  }, [setCBtcAda, setDailyChangeCBtc]);

  useEffect(() => {
    if (!cBtcAda) fetchCBtcPrice();
  }, [fetchCBtcPrice, cBtcAda]);

  useEffect(() => {
    if (!usdCNeta) fetchCNetaPrice();
  }, [fetchCNetaPrice, usdCNeta]);

  useEffect(() => {
    if (!usdAda) fetchAdaPrice();
  }, [fetchAdaPrice, usdAda]);

  useEffect(() => {
    if (!usdErg) fetchErgPrice();
  }, [fetchErgPrice, usdErg]);

  useEffect(() => {
    if (!usdBtc) fetchBtcPrice();
  }, [fetchBtcPrice, usdBtc]);

  return {
    usdCNeta,
    usdErg,
    usdAda,
    usdBtc,
    cBtcAda,
    dailyChangeCNeta,
    dailyChangeAda,
    dailyChangeErg,
    dailyChangeBtc,
    dailyChangeCBtc,
  };
};

export default usePrice;
