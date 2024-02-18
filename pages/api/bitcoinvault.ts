import { NextApiRequest, NextApiResponse  } from "next";
import mempoolJS from "@mempool/mempool.js";

const ADDRESS = process.env.BTC_WRAP_ADDRESS ?? "";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { bitcoin: { addresses } } = mempoolJS({
      hostname: 'mempool.space'
    });

    const address = ADDRESS;

    const myAddress = await addresses.getAddress({ address });

    res.status(200).json(myAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

}