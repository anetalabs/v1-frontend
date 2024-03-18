import { Cip30Wallet, WalletApi } from "@cardano-sdk/dapp-connector";
import { Lucid } from "lucid-cardano";
import { createContext, ReactNode, useState} from "react";
import { ModalState } from "../hooks/useModal";
import { Config } from "../utils";
import { CardanoNetwork } from "../utils/api";
import { CONSTANTS } from "../utils/constants";

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
  stakingInfo: any;
  setStakingInfo: (_: any) => void;
  address: string;
  setAddress: (_: string) => void;
  walletAddress: string;
  setWalletAddress: (_: string) => void;
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
    btcWrapCommunityAddress: "",
    btcUnwrapAddress: "",
    wrapFeeBtc: 0,
    unwrapFeeBtc: 0,
    unwrapFeeCardano: 0,
    cbtcAssetId: "",
    cnetaAssetId: "",
  },
  setConfig: () => {},
  stakingInfo: undefined,
  setStakingInfo: () => {},
  address: "",
  setAddress: () => {},
  walletAddress: "",
  setWalletAddress: () => {},
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
    btcWrapCommunityAddress: "",
    btcUnwrapAddress: "",
    wrapFeeBtc: 0,
    unwrapFeeBtc: 0,
    unwrapFeeCardano: 0,
    cbtcAssetId: "",
    cnetaAssetId: "",
  });
  const [stakingInfo, setStakingInfo] = useState<any>();
  const [walletAddress, setWalletAddress] = useState(
    CONSTANTS.STRINGS.wallet_connecting
  );
  const [address, setAddress] = useState<string>("");

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
    stakingInfo,
    setStakingInfo,
    address,
    setAddress,
    walletAddress,
    setWalletAddress,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
}
