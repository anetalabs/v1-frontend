import { useState, useEffect, useCallback } from "react";

const useCommunityRevenue = () => {
  const [info, setInfo] = useState<any>();

  const fetchCommunityRevenueInfo = useCallback(async () => {
    try {
      const res = await fetch("https://aneta-backend.vercel.app/api/info");
      const data = await res.json();
      setInfo(data);
    } catch (error) {
      console.error("Error fetching Community Revenue info:", error);
    }
  }, []);

  useEffect(() => {
    fetchCommunityRevenueInfo();
  }, [fetchCommunityRevenueInfo]);

  return info;
};

export default useCommunityRevenue;
