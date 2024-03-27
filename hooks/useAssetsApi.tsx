import { useEffect, useState, useCallback, useContext } from "react";
import { BlockfrostAssets } from "../types/blockfrost";
import { GlobalContext } from "../components/GlobalContext";

const useAssetsApi = () => {
  const { assetsData, setAssetsData } = useContext(GlobalContext);
  const { assetsLoading, setAssetsLoading } = useContext(GlobalContext);

  const fectchAssetApi = useCallback(async () => {
    try {
      const res = await fetch("/api/assets");
      const data = await res.json();
      setAssetsData(data);
      setAssetsLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setAssetsLoading(true);
    }
  }, [setAssetsData, setAssetsLoading]);

  useEffect(() => {
    if (!assetsData.quantity) fectchAssetApi();
  }, [fectchAssetApi, assetsData]);

  return { data: assetsData, loading: assetsLoading };
};

export default useAssetsApi;
