import type { NextApiRequest, NextApiResponse } from "next";
import { BLOCKFROST_URL, CardanoNetwork } from "../../utils/api";

const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BLOCKFROST_PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;
const ASSET_ID = process.env.CBTC_ASSET_ID;
const url = `${BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork]}/assets/${ASSET_ID}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID || !ASSET_ID) {
    return res
      .status(500)
      .send("Server is not setup properly. Missing .env file");
  }

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
