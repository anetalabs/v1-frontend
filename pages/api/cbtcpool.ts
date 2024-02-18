import type { NextApiRequest, NextApiResponse } from "next";

//const URL = "https://analytics.spectrum.fi/cardano/pools/overview";
const URL = "https://analytics-balanced.spectrum.fi/cardano/pools/overview";

interface PoolInfo {
  id: string;
  lockedX: {
    asset: {
      currencySymbol: string;
      tokenName: string;
    };
    amount: number;
  };
  lockedY: {
    asset: {
      currencySymbol: string;
      tokenName: string;
    };
    amount: number;
  };
  tvl: number;
  volume: number;
  fee: {
    x: number;
    y: number;
  };
  yearlyFeesPercent: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const id = "aee90e8aae33944110d8b807d7564537400f7f646ca507cd26795ff1.cBTC_ADA_NFT";

    const fetchResponse = await fetch(URL, {});
    const data: PoolInfo[] = await fetchResponse.json();

    const item = data.find(item => item.id === id);

    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }

}