import { useEffect, useState } from "react";
import { numberFormat } from "../utils/format";
import useAnetaData, { AnetaData } from "./useAnetaData";
import useBitcoinVault from "./useBitcoinVault";
import useCommunityRevenue from "./useCommunityRevenue";
import usePrice from "./usePrice";
import useMultisigVault from "./useMultisigVault";

export default function useDashboard() {
  const vault = useBitcoinVault();
  const multisigVault = useMultisigVault();
  const communityRevenueInfo = useCommunityRevenue();
  const {
    usdAda,
    dailyChangeAda,
    usdBtc,
    dailyChangeBtc,
    usdCNeta,
    usdErg,
    dailyChangeCNeta,
    cBtcAda,
    dailyChangeCBtc,
  } = usePrice();
  const { anetaData } = useAnetaData();
  const [tvlData, setTvlData] = useState<AnetaData[] | undefined>();
  const [protocolVolume, setProtocolVolume] = useState<string | undefined>();
  const [multisigBalance, setMultisigBalance] = useState<string | undefined>();
  const [hotBalance, setHotBalance] = useState<string | undefined>();
  const [communityRevenue, setCommunityRevenue] = useState<
    string | undefined
  >();

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  useEffect(() => {
    if (vault) {
      setProtocolVolume(
        numberFormat(
          (vault
            ? vault?.chain_stats.funded_txo_sum +
              vault?.chain_stats.spent_txo_sum
            : 0) / 100000000,
          5
        )
      );
      setHotBalance(
        numberFormat(
          (vault
            ? vault?.chain_stats.funded_txo_sum -
              vault?.chain_stats.spent_txo_sum
            : 0) / 100000000,
          5
        )
      );
    }
  }, [vault]);

  useEffect(() => {
    if (multisigVault) {
      setMultisigBalance(
        numberFormat(
          (multisigVault
            ? multisigVault?.chain_stats.funded_txo_sum -
              multisigVault?.chain_stats.spent_txo_sum
            : 0) / 100000000,
          5
        )
      );
    }
  }, [multisigVault]);

  useEffect(() => {
    if (communityRevenueInfo) {
      setCommunityRevenue(
        numberFormat(
          Number(communityRevenueInfo?.info.cbtcBalance ?? "0") / 100000000,
          8
        )
      );
    }
  }, [communityRevenueInfo]);

  useEffect(() => {
    // const storedData = sessionStorage.getItem("anetaData");
    // if (storedData && storedData !== "[]") {
    //   setTvlData(JSON.parse(storedData));
    // } else {
    //   if (anetaData) {
    //     const dataString = JSON.stringify(anetaData);
    //     sessionStorage.setItem("anetaData", dataString);
    //     setTvlData(anetaData);
    //   }
    // }
    setTvlData(anetaData)
  }, [anetaData]);

  return {
    formattedDate,
    tvlData,
    protocolVolume,
    communityRevenue,
    usdAda,
    cBtcAda,
    dailyChangeCBtc,
    usdBtc,
    dailyChangeBtc,
    usdCNeta,
    usdErg,
    dailyChangeCNeta,
    dailyChangeAda,
    multisigBalance,
    hotBalance,
  };
}
