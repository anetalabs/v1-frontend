import { useState, useEffect, useCallback } from "react";

const useCommunityFund = () => {
  const [adaFund, setAdaFund] = useState<string | undefined>();

  const fetchFundAda = useCallback(async () => {
    try {
      setAdaFund((745161).toString());
    } catch (error) {
      console.error("Error fetching Community Fund:", error);
    }
  }, []);

  useEffect(() => {
    fetchFundAda();
  }, [fetchFundAda]);

  return { adaFund };
};

export default useCommunityFund;
