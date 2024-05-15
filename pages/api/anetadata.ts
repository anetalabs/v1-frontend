import type { NextApiRequest, NextApiResponse } from "next";

const URL = "https://api.llama.fi/protocol/anetabtc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const fetchResponse = await fetch(URL, {});
  const data = await fetchResponse.json();

  res.status(200).send(
    data.chainTvls.Cardano.tokens
      .filter((token: any) => token.tokens.BTC)
      .map((token: any) => ({
        date: Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }).format(new Date(token.date * 1000)),
        amount: token.tokens.BTC,
      })),
  );
}
