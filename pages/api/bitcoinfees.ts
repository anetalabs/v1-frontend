import { NextApiRequest, NextApiResponse  } from "next";
import mempoolJS from "@mempool/mempool.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { bitcoin: { fees } } = mempoolJS({
    hostname: 'mempool.space'
  });

  const feesRecommended = await fees.getFeesRecommended();
  res.status(200).json(feesRecommended);

}