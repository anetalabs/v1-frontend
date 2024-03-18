import { useState, useEffect, useCallback, useContext } from "react";
import useCardanoWallet from "./useCardanoWallet";
import { GlobalContext } from "../components/GlobalContext";

const useStake = () => {
  // const [stakingInfo, setStakingInfo] = useState<any>();
  const { stakingInfo, setStakingInfo } = useContext(GlobalContext);
  const { walletMeta, address, walletAddress } = useCardanoWallet();

  const fetchStakingInfo = useCallback(
    async (address?: string) => {
      try {
        const res = await fetch("api/stakinginfo", {
          method: "POST",
          body: address ?? "",
        });
        const data = await res.json();
        setStakingInfo(data);
      } catch (error) {
        console.error("Error fetching Staking info:", error);
      }
    },
    [setStakingInfo]
  );

  const fetchStake = useCallback(
    async (address?: string) => {
      try {
        const res = await fetch("api/stake", {
          method: "POST",
          body: address ?? "",
        });
        const data = await res.json();
        if (data.result === "ok") {
          fetchStakingInfo(address);
          return "success";
        }
      } catch (error) {
        console.error("Error fetching Stake:", error);
        return "error";
      }
      return "failed";
    },
    [fetchStakingInfo]
  );

  useEffect(() => {
    if (!walletMeta || !address || walletAddress === "Connecting...")
      setStakingInfo(undefined);
    else fetchStakingInfo(address);
  }, [walletMeta, address, walletAddress, fetchStakingInfo, setStakingInfo]);

  return { stakingInfo, fetchStakingInfo, fetchStake, setStakingInfo };
};

export default useStake;
