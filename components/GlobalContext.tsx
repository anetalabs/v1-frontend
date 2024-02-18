import { Cip30Wallet, WalletApi } from "@cardano-sdk/dapp-connector";
import { Lucid } from "lucid-cardano";
import { createContext, ReactNode, useState} from "react";
import { ModalState } from "../hooks/useModal";
import { Config } from "../utils";
import { CardanoNetwork } from "../utils/api";

interface GlobalContextState {
  walletMeta: Cip30Wallet | null;
  setWalletMeta: (_: Cip30Wallet | null) => void;
  walletApi: WalletApi | null;
  setWalletApi: (_: WalletApi | null) => void;
  lucid: Lucid | null;
  setLucid: (_: Lucid) => void;
  modalState: ModalState;
  setModalState: (_: ModalState) => void;
  config: Config;
  setConfig: (_: Config) => void;
}

export const GlobalContext = createContext<GlobalContextState>({
  walletMeta: null,
  setWalletMeta: () => {},
  walletApi: null,
  setWalletApi: () => {},
  lucid: null,
  setLucid: () => {},
  modalState: {
    open: false,
    type: "info",
    text: "",
  },
  setModalState: () => {},
  config: {
    network: CardanoNetwork.Preview,
    btcWrapAddress: "",
    btcUnwrapAddress: "",
    wrapFeeBtc: 0,
    unwrapFeeBtc: 0,
    unwrapFeeCardano: 0,
    cbtcAssetId: "",
    cnetaAssetId: "",
  },
  setConfig: () => {},
});

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [walletMeta, setWalletMeta] = useState<Cip30Wallet | null>(null);
  const [walletApi, setWalletApi] = useState<WalletApi | null>(null);
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: "info",
    text: "",
  });
  const [config, setConfig] = useState<Config>({
    network: CardanoNetwork.Preview,
    btcWrapAddress: "",
    btcUnwrapAddress: "",
    wrapFeeBtc: 0,
    unwrapFeeBtc: 0,
    unwrapFeeCardano: 0,
    cbtcAssetId: "",
    cnetaAssetId: "",
  });

  const globalContext: GlobalContextState = {
    walletMeta,
    setWalletMeta,
    walletApi,
    setWalletApi,
    lucid,
    setLucid,
    modalState,
    setModalState,
    config,
    setConfig,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
}
