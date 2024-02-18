import { useState, useEffect, useCallback} from "react";

const useAdaPrice = () => {
  const [usdAda, setUsdAda] = useState<string | undefined>();
  const [dailyChangeAda, setDailyChangeAda] = useState<string | undefined>();

  const fetchAdaPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/adaprice");
      const data = await res.json();

      setUsdAda(data.price);
      setDailyChangeAda(data.dailyChange);
    } catch (error) {
      console.error("Error fetching Ada Price:", error);
    }
  }, []);

  useEffect(() => {
    fetchAdaPrice();
  }, [fetchAdaPrice]);

  return { usdAda, dailyChangeAda };
};

export default useAdaPrice;