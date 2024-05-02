import { useState, useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const useMultisigVault = () => {
  const { multisigVault, setMultisigVault } = useContext(GlobalContext);

  const fetchMultisigVault = useCallback(async () => {
    try {
      const res = await fetch("/api/multisigvault");
      const data = await res.json();
      setMultisigVault(data);
    } catch (error) {
      console.error("Error fetching Bitcoin fees:", error);
    }
  }, [setMultisigVault]);

  useEffect(() => {
    if (!multisigVault) fetchMultisigVault();
  }, [fetchMultisigVault, multisigVault]);

  return multisigVault;
};

export default useMultisigVault;
