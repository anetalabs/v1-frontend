import type { NextApiRequest, NextApiResponse } from "next";

const URL = "https://api.poloniex.com/markets/ADA_USDT/price";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{

    if (req.method !== "GET") {
      return res.status(405).end();
    }
    
     const fetchResponse = await (
      await fetch(`${URL}`, {})
    ).json();
  
    res.status(200).send(fetchResponse);
  
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }

}
