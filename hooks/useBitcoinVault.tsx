import { useState, useEffect, useCallback} from "react";

const useBitcoinVault = () => {
  const [address, setAddress] = useState();

  const fetchBitcoinAddress = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinvault");
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

export default useBitcoinVault;