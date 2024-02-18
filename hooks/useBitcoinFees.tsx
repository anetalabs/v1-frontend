import { useState, useEffect, useCallback} from "react";

const useBitcoinFees = () => {
  const [feesRecommended, setFeesRecommended] = useState<number | undefined>();

  const fetchBitcoinFees = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinfees");
      const data = await res.json();
      const minFee = 12
      const recommendedFee = Math.ceil(data.hourFee*1.33);
      setFeesRecommended(recommendedFee < minFee ? minFee : recommendedFee);
      //setFeesRecommended(data.hourFee);
    } catch (error) {
      console.error("Error fetching Bitcoin fees:", error);
    }
  }, []);

  useEffect(() => {
    fetchBitcoinFees();
  }, [fetchBitcoinFees]);

  return feesRecommended;
};

export default useBitcoinFees;