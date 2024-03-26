import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useAdaPrice = () => {
  const { usdAda, setUsdAda, dailyChangeAda, setDailyChangeAda } =
    useContext(GlobalContext);

  const fetchAdaPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/adaprice");
      const data = await res.json();

      setUsdAda(data.price);
      setDailyChangeAda(data.dailyChange);
    } catch (error) {
      console.error("Error fetching Ada Price:", error);
    }
  }, [setUsdAda, setDailyChangeAda]);

  useEffect(() => {
    if (!usdAda || !dailyChangeAda) fetchAdaPrice();
  }, [fetchAdaPrice, usdAda, dailyChangeAda]);

  return { usdAda, dailyChangeAda };
};

export default useAdaPrice;
