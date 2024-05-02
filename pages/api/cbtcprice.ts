import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CMC_API_KEY ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const URL = `https://pro-api.coinmarketcap.com/v4/dex/pairs/quotes/latest?network_slug=cardano&contract_address=333f12dc7aed82cd3d4c057e28859fadfd677fc93e0662ab4be5942c9e194dc2`;

  try {
    const result = await (
      await fetch(URL, {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      })
    ).json();

    const quote = result.data[0].quote[0];

    res.status(200).send({
      price: 1 / quote.price_by_quote_asset,
      dailyChange: quote.percent_change_price_24h * 100,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
