import { useState, useEffect, useCallback } from "react";

const useCommunityVault = () => {
  const [address, setAddress] = useState<any>();

  const fetchBitcoinAddress = useCallback(async () => {
    try {
      const res = await fetch("/api/communityvault");
      const data = await res.json();
      setAddress(data);
    } catch (error) {
      console.error("Error fetching Bitcoin fees:", error);
    }
  }, []);

  useEffect(() => {
    fetchBitcoinAddress();
  }, [fetchBitcoinAddress]);

  return address;
};

export default useCommunityVault;
