import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CS_API_KEY ?? "";
const POLICY_ID = process.env.GOVERNANCE_POLICY_ID ?? "";
const HASH1 = process.env.GOVERNANCE_OPTION1_HASH ?? "";
const HASH2 = process.env.GOVERNANCE_OPTION2_HASH ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const URL1 = `https://api.cardanoscan.io/api/v1/asset/list/byAddress?address=${HASH1}&pageNo=1&limit=20`;
  const URL2 = `https://api.cardanoscan.io/api/v1/asset/list/byAddress?address=${HASH2}&pageNo=1&limit=20`;

  try {
    const result1 = await (
      await fetch(URL1, {
        headers: {
          apiKey: API_KEY,
        },
      })
    ).json();

    const result2 = await (
      await fetch(URL2, {
        headers: {
          apiKey: API_KEY,
        },
      })
    ).json();

    const info = {
      voteYesBalance: Number(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        result1.tokens.filter((token: any) => token.policyId === POLICY_ID)[0]
          ?.balance ?? 0
      ),
      voteNoBalance: Number(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        result2.tokens.filter((token: any) => token.policyId === POLICY_ID)[0]
          ?.balance ?? 0
      ),
    };

    res.status(200).send({
      info,
    });
    // res.status(200).send({
    //   data1,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
