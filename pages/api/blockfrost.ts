import type { NextApiRequest, NextApiResponse } from "next";
import { BLOCKFROST_URL, CardanoNetwork } from "../../utils/api";

const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BLOCKFROST_PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, method, body, headers } = req.body;

  if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID) {
    return res
      .status(500)
      .send("Server is not setup properly. Missing .env file");
  }

  const blockfrostUrl = BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork];

  const fetchResponse = await (
    await fetch(`${blockfrostUrl}${url}`, {
      method,
      body,
      headers: {
        ...headers,
        project_id: BLOCKFROST_PROJECT_ID,
      },
    })
  ).json();

  res.status(200).send(fetchResponse);
}
