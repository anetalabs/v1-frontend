import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CMC_API_KEY ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { symbol, convert } = req.query;

  const URL = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${
    symbol ?? "cneta"
  }&convert=${convert ?? "USD"}`;

  try {
    const result = await (
      await fetch(URL, {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      })
    ).json();

    const quote =
      result.data[(symbol as string).toUpperCase() ?? "CNETA"][0].quote[
        (convert as string) ?? "USD"
      ];

    res.status(200).send({
      price: quote.price,
      dailyChange: quote.percent_change_24h,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
