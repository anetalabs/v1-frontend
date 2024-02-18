import {
  Constr,
  Data,
  fromText,
  Script,
  toUnit,
  WalletApi,
  UTxO
} from "lucid-cardano";
import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { CONSTANTS } from "../utils/constants";
import { get } from "http";

export default function useLucid() {
  const { lucid, walletApi, config } = useContext(GlobalContext);

  const unwrap = async ({
    burnAmount,
    btcAddress,
  }: {
    /** burnAmount is in btc, need to convert to sats */
    burnAmount: number;
    btcAddress: string;
  }) => {
    const burnAmountInSats = Number((burnAmount*Math.pow(10, 8)).toFixed(0));
    const lucid = initLucid();

    const cBTCMintingPolicy: Script = {
      type: "PlutusV2",
      script: CONSTANTS.CBTC_MINTING_POLICY[config.network],
    };

    const unit = toUnit(
      lucid.utils.mintingPolicyToId(cBTCMintingPolicy),
      fromText("cBTC")
    );

    /*
    const walletUtxos = await lucid.utxosAtWithUnit(
      await lucid.wallet.address(),
      unit
    );
    */

    const walletUtxos = await getUtxos();
    const filteredUtxos = walletUtxos.filter((item) => item.assets.hasOwnProperty(unit));

    /*
    const replacer = (key: any, value: any) => typeof value === "bigint" ? value.toString() : value;
    console.log('UTxOs:');
    console.log(JSON.stringify(walletUtxos, replacer, 2));

    console.log('Filtered UTxOs:');
    console.log(JSON.stringify(filteredUtxos, replacer, 2));

    console.log(unit);
    */
    
    if (!filteredUtxos.length) {
      throw new Error("cBTC not found in wallet.");
    }
    const redeemer = Data.to(new Constr(1, []));

    const totalAssets = { [unit]: BigInt(-burnAmountInSats) };
    const tx = await lucid
      .newTx()
      .collectFrom(filteredUtxos)
      .attachMintingPolicy(cBTCMintingPolicy)
      .mintAssets(totalAssets, redeemer)
      .attachMetadata(0, {
        btcAddress: btcAddress,
        burnAmount: -burnAmountInSats,
      })
      .complete();

    const signedTx = await tx.sign().complete();

    const txHash = signedTx.submit();
    return txHash;
  };

  const getUtxos = async ( ): Promise< UTxO[] > => {
    return  await lucid?.wallet.getUtxos() || [];
  }

  const getUserPaymentCredential = async (): Promise<string> => {
    const lucid = initLucid();
    const userAddress = await lucid?.wallet.address();
    const credential = lucid?.utils.paymentCredentialOf(userAddress);
    return lucid.utils.credentialToAddress(credential);
  };

  const initLucid = () => {
    if (!lucid || !walletApi) {
      throw new Error("Please connect your wallet");
    }
    lucid.selectWallet(walletApi as unknown as WalletApi);
    return lucid;
  };

  return { unwrap, getUserPaymentCredential , getUtxos};
}
