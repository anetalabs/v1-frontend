import { Lucid } from "lucid-cardano";
import { ReactNode, useContext, useEffect } from "react";
import useCardanoWallet from "../hooks/useCardanoWallet";
import { BffService } from "../services/bff";
import { CustomBlockfrost } from "../services/provider/blockfrost";
import { CONSTANTS } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";

export default function Init({ children }: { children: ReactNode }) {
  const { setLucid, setConfig } = useContext(GlobalContext);
  const { connectWallet } = useCardanoWallet();

  const initLucid = async () => {
    const config = await BffService.getConfig();
    setConfig(config);
    setLucid(await Lucid.new(new CustomBlockfrost(), config.network));
  };

  const initWalletIfDefined = async () => {
    const existingWalletInLocalStorage = localStorage.getItem(
      CONSTANTS.LOCAL_STORAGE_KEYS.WALLET
    );
    if (existingWalletInLocalStorage) {
      await connectWallet(existingWalletInLocalStorage);
    }
  };

  useEffect(() => {
    initLucid();
    initWalletIfDefined();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
