import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useVoting = () => {
  const { votingInfo, setVotingInfo } = useContext(GlobalContext);

  const fetchVoting = useCallback(async () => {
    try {
      const res = await fetch("/api/voting");
      const data = await res.json();
      setVotingInfo(data.info);
    } catch (error) {
      console.error("Error fetching Community Revenue info:", error);
    }
  }, [setVotingInfo]);

  useEffect(() => {
    fetchVoting();
  }, [fetchVoting]);

  return votingInfo;
};

export default useVoting;
