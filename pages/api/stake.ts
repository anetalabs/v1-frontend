import { NextApiRequest, NextApiResponse } from "next";
import mempoolJS from "@mempool/mempool.js";

const ADDRESS = process.env.STAKING_ADDRESS ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const result = await fetch(
      "https://aneta-staking-backend.vercel.app/api/staking/stake",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: ADDRESS,
        }),
      }
    );
    const data = await result.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
