// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CardanoNetwork, isValidNetwork } from "../../utils/api";
import { Dto } from "../../utils/dto";

const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BTC_WRAP_ADDRESS = process.env.BTC_WRAP_ADDRESS ?? "";
const BTC_UNWRAP_ADDRESS = process.env.BTC_UNWRAP_ADDRESS ?? "";
const WRAP_FEE_BTC = Number(process.env.WRAP_FEE_BTC ?? 0);
const UNWRAP_FEE_BTC = Number(process.env.UNWRAP_FEE_BTC ?? 0);
const UNWRAP_FEE_CARDANO = Number(process.env.UNWRAP_FEE_CARDANO ?? 0);
const CBTC_ASSET_ID = process.env.CBTC_ASSET_ID ?? "";
const CNETA_ASSET_ID = process.env.CNETA_ASSET_ID ?? "";

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<Dto.GetConfig["response"]>
) {
  let network = CardanoNetwork.Preview;

  if (CARDANO_NETWORK && isValidNetwork(CARDANO_NETWORK)) {
    network = CARDANO_NETWORK;
  }

  res.status(200).json({
    network,
    btcWrapAddress: BTC_WRAP_ADDRESS,
    btcUnwrapAddress: BTC_UNWRAP_ADDRESS,
    wrapFeeBtc: WRAP_FEE_BTC,
    unwrapFeeBtc: UNWRAP_FEE_BTC,
    unwrapFeeCardano: UNWRAP_FEE_CARDANO,
    cbtcAssetId: CBTC_ASSET_ID,
    cnetaAssetId: CNETA_ASSET_ID,
  });
}
