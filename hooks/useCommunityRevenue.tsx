import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useCommunityRevenue = () => {
  // const [info, setInfo] = useState<any>();
  const { communityRevenueInfo, setCommunityRevenueInfo } =
    useContext(GlobalContext);

  const fetchCommunityRevenueInfo = useCallback(async () => {
    try {
      const res = await fetch(
        "https://aneta-staking-backend.vercel.app/api/info/cbtc"
      );
      const data = await res.json();
      setCommunityRevenueInfo(data);
    } catch (error) {
      console.error("Error fetching Community Revenue info:", error);
    }
  }, [setCommunityRevenueInfo]);

  useEffect(() => {
    fetchCommunityRevenueInfo();
  }, [fetchCommunityRevenueInfo]);

  return communityRevenueInfo;
};

export default useCommunityRevenue;
