import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CMC_API_KEY ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { symbol, amount, convert } = req.query;

  const URL = `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=${
    symbol ?? "cneta"
  }&amount=${amount ?? "1"}&convert=${convert ?? "USD"}`;

  try {
    const result = await (
      await fetch(URL, {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      })
    ).json();

    res
      .status(200)
      .send({
        price: result.data[0].quote[(convert as string) ?? "USD"].price,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
