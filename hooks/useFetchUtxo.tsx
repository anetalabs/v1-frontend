import { useState, useEffect, useCallback } from 'react';
import { Utxo } from '../types/blockfrost';
import useCardanoWallet from "./useCardanoWallet";

const useFetchUtxo = (inputAddress?: string) => {
  const { walletMeta, address, walletAddress } = useCardanoWallet();
  const [utxos, setUtxos] = useState<Utxo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const fectchUtxo = useCallback(async () => {
    if (!walletMeta || address === "" || walletAddress === "Connecting...") {
      return;
    }

    try {
      const res = await fetch(
        `/api/balance?address=${encodeURIComponent(inputAddress ?? address)}`
      );
      const data = await res.json();
      if (data.status_code !== undefined) {
        throw new Error(data.status_code);
      }
      setUtxos(data);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching UTXOs");
      return;
    }
  }, [inputAddress, address, walletMeta, walletAddress]);

  useEffect(() => {
    fectchUtxo();
  }, [fectchUtxo]);

  return { utxos, error, loading };
};
  
  export default useFetchUtxo;