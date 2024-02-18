import { useEffect, useState } from "react";
import useAdaPrice from "./useAdaPrice";
import useBitcoinPrice from "./useBitcoinPrice";
import { adaFormat, usdFormat } from "../utils/format";
import usecBtcPrice from "./usecBtcPrice";
import useAnetaData, { AnetaData } from "./useAnetaData";


export default function useDashboard() {

  const { usdBtc, dailyChangeBtc} = useBitcoinPrice();
  const { usdAda } = useAdaPrice();
  const { cBtcAda } = usecBtcPrice();
  const { anetaData } = useAnetaData();

  const [usdBtcPrice, setUsdBtcPrice] = useState<string | undefined>();
  const [usdcBtcPrice, setUsdcBtcPrice] = useState<string | undefined>();
  const [adaBtcPrice, setAdaBtcPrice] = useState<string | undefined>();
  const [adacBtcPrice, setAdacBtcPrice] = useState<string | undefined>();
  const [dailyChangeBtcPrice, setDailyChangeBtcPrice] = useState<string | undefined>();
  const [tvlData, setTvlData] = useState<AnetaData[] | undefined>();

  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  useEffect(() => {
    if(usdAda && usdBtc){
      setAdaBtcPrice(adaFormat((Number(usdBtc)/Number(usdAda)).toFixed(2)))
      setUsdBtcPrice(usdFormat(usdBtc))
      setDailyChangeBtcPrice((Number(dailyChangeBtc)*100).toFixed(2))
    }
  },[usdAda, usdBtc, dailyChangeBtc])

  useEffect(() => {
    if(usdAda && cBtcAda){
      setAdacBtcPrice(adaFormat(cBtcAda))
      setUsdcBtcPrice(usdFormat((Number(cBtcAda)*Number(usdAda)).toFixed(2)))
    }
  },[usdAda, cBtcAda])

  useEffect(() => {
    const storedData = sessionStorage.getItem('anetaData');
    if(storedData){
      setTvlData(JSON.parse(storedData))
    }else{
      if(anetaData){
        const dataString = JSON.stringify(anetaData);
        sessionStorage.setItem('anetaData', dataString)
        setTvlData(anetaData)
      }
    }
  }, [anetaData])

  return {
    usdBtcPrice,
    usdcBtcPrice,
    adaBtcPrice,
    adacBtcPrice,
    dailyChangeBtcPrice,
    formattedDate,
    tvlData,
  }

}