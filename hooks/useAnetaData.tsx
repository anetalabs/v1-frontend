import { useState, useEffect, useCallback} from "react";

export interface AnetaData {
  date: string;
  amount: number
}

const useAnetaData = () => {
  const [anetaData, setAnetaData] = useState<AnetaData[] | undefined>();

  const fetchAnetaData = useCallback(async () => {
    try {
      const res = await fetch("/api/anetadata");
      const data: AnetaData[] = await res.json();

      setAnetaData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAnetaData();
  }, [fetchAnetaData]);

  return { anetaData };
};

export default useAnetaData;