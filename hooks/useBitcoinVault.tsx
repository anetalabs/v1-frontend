import { useState, useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useBitcoinVault = () => {
  const { bitcoinVault, setBitcoinVault } = useContext(GlobalContext);

  const fetchBitcoinVault = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinvault");
      const data = await res.json();
      setBitcoinVault(data);
    } catch (error) {
      console.error("Error fetching Bitcoin fees:", error);
    }
  }, [setBitcoinVault]);

  useEffect(() => {
    if (!bitcoinVault) fetchBitcoinVault();
  }, [fetchBitcoinVault, bitcoinVault]);

  return bitcoinVault;
};

export default useBitcoinVault;
