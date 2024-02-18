import { useState, useEffect, useCallback } from 'react';
import { Utxo } from '../types/blockfrost';

const useFetchUtxo = (address: string) => {
  const [utxos, setUtxos] = useState<Utxo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>();
  const fectchUtxo = useCallback(async () => {

    if (address === '') {
      return;
    }


    try {
      const res = await fetch(`/api/balance?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      if(data.status_code !== undefined){
        throw new Error(data.status_code);
      }
      setUtxos(data);
      setLoading(false)
    } catch (error) {
      setError('An error occurred while fetching UTXOs');
      return;

      
    }
  }, [address]);
  
  useEffect(() => {
    fectchUtxo();
  }, [fectchUtxo]);
  
  return {utxos, error, loading};
  };
  
  export default useFetchUtxo;