import { Cip30Wallet, WalletApi } from "@cardano-sdk/dapp-connector";
import { Lucid } from "lucid-cardano";
import { createContext, ReactNode, useState} from "react";
import { ModalState } from "../hooks/useModal";
import { Config } from "../utils";
import { CardanoNetwork } from "../utils/api";
import { CONSTANTS } from "../utils/constants";
import { BlockfrostAssets } from "../types/blockfrost";
import { AnetaData } from "../hooks/useAnetaData";

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
  communityRevenueInfo: any;
  setCommunityRevenueInfo: (_: any) => void;
  assetsData: BlockfrostAssets;
  setAssetsData: (_: BlockfrostAssets) => void;
  assetsLoading: boolean;
  setAssetsLoading: (_: boolean) => void;
  bitcoinVault: any;
  setBitcoinVault: (_: any) => void;
  usdBtc: string;
  setUsdBtc: (_: string) => void;
  dailyChangeBtc: string;
  setDailyChangeBtc: (_: string) => void;
  usdAda: string;
  setUsdAda: (_: string) => void;
  dailyChangeAda: string;
  setDailyChangeAda: (_: string) => void;
  anetaData: AnetaData[] | undefined;
  setAnetaData: (_: AnetaData[] | undefined) => void;
  cBtcAda: string;
  setCBtcAda: (_: string) => void;
  votingInfo: any;
  setVotingInfo: (_: any) => void;
  usdCNeta: string;
  setUsdCNeta: (_: string) => void;
  usdErg: string;
  setUsdErg: (_: string) => void;
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
  communityRevenueInfo: undefined,
  setCommunityRevenueInfo: () => {},
  assetsData: {
    asset: "",
    asset_name: "",
    fingerprint: "",
    initial_mint_tx_hash: "",
    metadata: {
      name: "",
      description: "",
      logo: "",
      decimals: 0,
      ticker: "",
      url: "",
    },
    mint_or_burn_count: 0,
    quantity: "",
    policy_id: "",
  },
  setAssetsData: () => {},
  assetsLoading: true,
  setAssetsLoading: () => {},
  bitcoinVault: undefined,
  setBitcoinVault: () => {},
  usdBtc: "",
  setUsdBtc: () => {},
  dailyChangeBtc: "",
  setDailyChangeBtc: () => {},
  usdAda: "",
  setUsdAda: () => {},
  dailyChangeAda: "",
  setDailyChangeAda: () => {},
  anetaData: undefined,
  setAnetaData: () => {},
  cBtcAda: "",
  setCBtcAda: () => {},
  votingInfo: undefined,
  setVotingInfo: () => {},
  usdCNeta: "",
  setUsdCNeta: () => {},
  usdErg: "",
  setUsdErg: () => {},
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
  const [communityRevenueInfo, setCommunityRevenueInfo] = useState<any>();
  const [assetsData, setAssetsData] = useState<BlockfrostAssets>({
    asset: "",
    asset_name: "",
    fingerprint: "",
    initial_mint_tx_hash: "",
    metadata: {
      name: "",
      description: "",
      logo: "",
      decimals: 0,
      ticker: "",
      url: "",
    },
    mint_or_burn_count: 0,
    quantity: "",
    policy_id: "",
  });
  const [assetsLoading, setAssetsLoading] = useState<boolean>(true);
  const [bitcoinVault, setBitcoinVault] = useState<any>();
  const [usdBtc, setUsdBtc] = useState<string>("");
  const [dailyChangeBtc, setDailyChangeBtc] = useState<string>("");
  const [usdAda, setUsdAda] = useState<string>("");
  const [usdCNeta, setUsdCNeta] = useState<string>("");
  const [usdErg, setUsdErg] = useState<string>("");
  const [dailyChangeAda, setDailyChangeAda] = useState<string>("");
  const [anetaData, setAnetaData] = useState<AnetaData[] | undefined>();
  const [cBtcAda, setCBtcAda] = useState<string>("");
  const [votingInfo, setVotingInfo] = useState<any>();

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
    communityRevenueInfo,
    setCommunityRevenueInfo,
    assetsData,
    setAssetsData,
    assetsLoading,
    setAssetsLoading,
    bitcoinVault,
    setBitcoinVault,
    usdBtc,
    setUsdBtc,
    dailyChangeBtc,
    setDailyChangeBtc,
    usdAda,
    setUsdAda,
    usdCNeta,
    setUsdCNeta,
    usdErg,
    setUsdErg,
    dailyChangeAda,
    setDailyChangeAda,
    anetaData,
    setAnetaData,
    cBtcAda,
    setCBtcAda,
    votingInfo,
    setVotingInfo,
  };

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
}
