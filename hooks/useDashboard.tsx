import { useEffect, useState } from "react";
import useAdaPrice from "./useAdaPrice";
import useBitcoinPrice from "./useBitcoinPrice";
import { adaFormat, numberFormat, usdFormat } from "../utils/format";
import usecBtcPrice from "./usecBtcPrice";
import useAnetaData, { AnetaData } from "./useAnetaData";
import useCommunityFund from "./useCommunityFund";
import useBitcoinVault from "./useBitcoinVault";
import useCommunityVault from "./useCommunityVault";
import useCommunityRevenue from "./useCommunityRevenue";

export default function useDashboard() {
  const { usdBtc, dailyChangeBtc } = useBitcoinPrice();
  const vault = useBitcoinVault();
  const communityVault = useCommunityVault();
  const communityRevenueInfo = useCommunityRevenue();
  const { usdAda } = useAdaPrice();
  const { cBtcAda } = usecBtcPrice();
  const { anetaData } = useAnetaData();
  const { adaFund } = useCommunityFund();

  const [usdBtcPrice, setUsdBtcPrice] = useState<string | undefined>();
  const [usdcBtcPrice, setUsdcBtcPrice] = useState<string | undefined>();
  const [adaBtcPrice, setAdaBtcPrice] = useState<string | undefined>();
  const [adacBtcPrice, setAdacBtcPrice] = useState<string | undefined>();
  const [dailyChangeBtcPrice, setDailyChangeBtcPrice] = useState<
    string | undefined
  >();
  const [tvlData, setTvlData] = useState<AnetaData[] | undefined>();
  const [adaFundPrice, setAdaFundPrice] = useState<string | undefined>();
  const [usdFundPrice, setUsdFundPrice] = useState<string | undefined>();
  const [protocolVolume, setProtocolVolume] = useState<string | undefined>();
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
          (
            Number(
              vault?.chain_stats.funded_txo_sum +
                vault?.chain_stats.spent_txo_sum
            ) / 100000000
          ).toFixed(4)
        )
      );
    }
  }, [vault]);

  // useEffect(() => {
  //   if (communityVault) {
  //     setCommunityRevenue(
  //       numberFormat(
  //         (
  //           Number(
  //             communityVault?.chain_stats.funded_txo_sum +
  //               communityVault?.chain_stats.spent_txo_sum
  //           ) / 100000000
  //         ).toFixed(4)
  //       )
  //     );
  //   }
  // }, [communityVault]);

  useEffect(() => {
    if (communityRevenueInfo) {
      setCommunityRevenue(
        numberFormat(
          (Number(communityRevenueInfo?.info.cbtcBalance) / 100000000).toFixed(
            4
          )
        )
      );
    }
  }, [communityRevenueInfo]);

  useEffect(() => {
    if (usdAda && usdBtc) {
      setAdaBtcPrice(adaFormat((Number(usdBtc) / Number(usdAda)).toFixed(2)));
      setUsdBtcPrice(usdFormat(usdBtc));
      setDailyChangeBtcPrice((Number(dailyChangeBtc) * 100).toFixed(2));
    }
  }, [usdAda, usdBtc, dailyChangeBtc]);

  useEffect(() => {
    if (usdAda && cBtcAda) {
      setAdacBtcPrice(adaFormat(cBtcAda));
      setUsdcBtcPrice(usdFormat((Number(cBtcAda) * Number(usdAda)).toFixed(2)));
    }
  }, [usdAda, cBtcAda]);

  useEffect(() => {
    if (usdAda && adaFund) {
      setAdaFundPrice(adaFormat(adaFund));
      setUsdFundPrice(usdFormat((Number(adaFund) * Number(usdAda)).toFixed(2)));
    }
  }, [usdAda, adaFund]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("anetaData");
    if (storedData) {
      setTvlData(JSON.parse(storedData));
    } else {
      if (anetaData) {
        const dataString = JSON.stringify(anetaData);
        sessionStorage.setItem("anetaData", dataString);
        setTvlData(anetaData);
      }
    }
  }, [anetaData]);

  return {
    usdBtcPrice,
    usdcBtcPrice,
    adaBtcPrice,
    adacBtcPrice,
    dailyChangeBtcPrice,
    formattedDate,
    tvlData,
    adaFundPrice,
    usdFundPrice,
    protocolVolume,
    communityRevenue,
  };
}