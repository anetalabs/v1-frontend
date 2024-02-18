import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import useLucid from "./useLucid";
import { useTryCatch } from "./useTryCatch";
import { validate } from 'multicoin-address-validator';
import { formatAmount, usdFormat } from "../utils/format";
import useBitcoinFees from "./useBitcoinFees";
import useBitcoinPrice from "./useBitcoinPrice";

export enum UnwrapStage {
  NotStart,
  Success,
}

export default function useUnwrap() {
  const { config } = useContext(GlobalContext);
  const unwrapFeeBtc = config.unwrapFeeBtc;
  const unwrapFeeCardano = config.unwrapFeeCardano;

  const feesRecommended: number | undefined = useBitcoinFees();
  const {usdBtc} = useBitcoinPrice();
  const [networkFee, setNetworkFee] = useState("")

  useEffect(() => {
    if(feesRecommended){
      setNetworkFee(formatAmount((feesRecommended*144)/100000000));
    }
  }, [feesRecommended]);

  const { tryWithErrorHandler } = useTryCatch();
  const { unwrap: lucidUnwrap } = useLucid();

  const [policyId, setPolicyId] = useState("")
  const [amount, setAmount] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState<string | undefined>();
  const [usdReceive, setUsdReceive] = useState<string | undefined>();
  const [unwrapBtcDestination, setUnwrapBtcDestination] = useState("");
  const [bridgeFee, setBridgeFee] = useState(0);
  const [btcToBeReceived, setBtcToBeReceived] = useState(0);
  const [isTxSuccessful, setIsTxSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unwrapStage, setUnwrapStage] = useState<UnwrapStage>(
    UnwrapStage.NotStart
  );

  useEffect(() => {
    const fee = (unwrapFeeBtc / 100 * Number(amount) + 0.0005 + Number(networkFee));
    setPolicyId(config.cbtcAssetId)
    if(amount === ""){
      setBridgeFee(0)
      setBtcToBeReceived(0);
      setUsdAmount(undefined);
      setUsdReceive(undefined);
    } else{
      setBridgeFee(fee);
      setBtcToBeReceived(Number(amount) - fee);
      if(usdBtc){
        setUsdAmount(usdFormat((Number(amount) * Number(usdBtc)).toFixed(2)))
        setUsdReceive(usdFormat(((Number(amount) - fee) * Number(usdBtc)).toFixed(2)))
      }
    }
  }, [unwrapFeeBtc, amount, networkFee, config.cbtcAssetId, usdBtc]);

  let validAdrres : any
   const unwrap = async () => {
    if(config.network === "Mainnet"){
      validAdrres = validate(unwrapBtcDestination, 'BTC');
    }else{
      validAdrres = validate(unwrapBtcDestination, 'BTC', 'testnet');
    }
    
    await tryWithErrorHandler(async () => {
      setIsLoading(true);
      if (!validAdrres) {
        setIsLoading(false);
        throw new Error(
          "Please enter a valid BTC Destination Address"
        );
      }
      await lucidUnwrap({
        burnAmount: Number(amount),
        btcAddress: unwrapBtcDestination,
      });



        setUnwrapStage(UnwrapStage.Success);


    });
    setIsLoading(false);
  };

  return {
    amount,
    unwrapFeeBtc,
    unwrapFeeCardano,
    bridgeFee,
    btcToBeReceived,
    unwrapBtcDestination,
    isTxSuccessful,
    setAmount,
    unwrap,
    setUnwrapBtcDestination,
    isLoading,
    unwrapStage,
    setUnwrapStage,
    networkFee,
    policyId,
    usdAmount,
    usdReceive,
  };
}
