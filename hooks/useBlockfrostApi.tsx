import { useEffect, useState, useCallback } from "react";
import { BlockfrostAssets } from "../types/blockfrost";

const useBlockfrostApi = (url: string) => {

  const [data, setData] = useState<BlockfrostAssets>();
  const [loading, setLoading] = useState(false);


const fectchBlockFrostApi = useCallback(async () => {

  try {
    setLoading(true);
    const response = await fetch(`/api/blockfrost`, {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      setData(responseData);
    } else {
      console.error("API request failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }
}, [url]);

useEffect(() => {
  fectchBlockFrostApi();
}, [fectchBlockFrostApi]);

return {data, loading};
};

export default useBlockfrostApi;

