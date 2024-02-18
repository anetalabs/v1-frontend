import { useEffect, useState, useCallback } from "react";
import { BlockfrostAssets } from "../types/blockfrost";

const useAssetsApi = () => {

  const [data, setData] = useState<BlockfrostAssets>();
  const [loading, setLoading] = useState(true);


const fectchAssetApi = useCallback(async () => {

  try {
    const res = await fetch("/api/assets");
    const data = await res.json();
    setData(data);
    setLoading(false);
  } catch (error) {
    console.error("An error occurred:", error);
    setLoading(true);
  }
}, []);

useEffect(() => {
  fectchAssetApi();
}, [fectchAssetApi]);

return {data, loading};
};

export default useAssetsApi;

