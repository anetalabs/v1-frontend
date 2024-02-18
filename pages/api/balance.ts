import type { NextApiRequest, NextApiResponse } from "next";
import { BLOCKFROST_URL, CardanoNetwork } from "../../utils/api";
import {C , Lucid , Utils} from "lucid-cardano"

const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BLOCKFROST_PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;
const CBTC_ASSET_ID = process.env.CBTC_ASSET_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address' });
  }
  
  if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID || !address) {
    return res
      .status(500)
      .send("Server is not setup properly. Missing .env file");
  }
  const lucid = await Lucid.new( undefined , CARDANO_NETWORK as CardanoNetwork );
  const addressCredential  = lucid.utils.getAddressDetails(address).paymentCredential;

  const credentialBech32 = addressCredential?.type === "Key"
  ? C.Ed25519KeyHash.from_hex(addressCredential.hash).to_bech32(
    "addr_vkh",
  )
  : C.ScriptHash.from_hex(addressCredential?.hash || "" ).to_bech32(
    "addr_vkh",
  );
  const url = `${BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork]}/addresses/${credentialBech32}/utxos/${CBTC_ASSET_ID}`;

  const headers = {
    project_id: BLOCKFROST_PROJECT_ID
  }

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
