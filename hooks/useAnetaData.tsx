import { useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

export interface AnetaData {
  date: string;
  amount: number;
}

const useAnetaData = () => {
  const { anetaData, setAnetaData } = useContext(GlobalContext);

  const fetchAnetaData = useCallback(async () => {
    try {
      const res = await fetch("/api/anetadata");
      const data: AnetaData[] = await res.json();
      setAnetaData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setAnetaData]);

  useEffect(() => {
    if (!anetaData) fetchAnetaData();
  }, [fetchAnetaData, anetaData]);

  return { anetaData };
};

export default useAnetaData;
