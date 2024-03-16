import { useState, useEffect, useCallback } from "react";

const useStakingInfo = () => {
  const [info, setInfo] = useState<any>();

  const fetchStakingInfo = useCallback(async () => {
    try {
      const res = await fetch("api/stakinginfo");
      const data = await res.json();
      setInfo(data);
    } catch (error) {
      console.error("Error fetching Staking info:", error);
    }
  }, []);

  useEffect(() => {
    fetchStakingInfo();
  }, [fetchStakingInfo]);

  return info;
};

export default useStakingInfo;
