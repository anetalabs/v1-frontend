import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.CS_API_KEY ?? "";
const assetIds = {
	cbtc: process.env.CBTC_ASSET_ID ?? "",
};
const HASHES = [process.env.BTC_COMMUNITY_HASH ?? ""];

interface Token {
	assetId: string;
	balance: string;
}

interface ApiResponse {
	tokens: Token[];
}

interface TokenBalances {
	[key: string]: number;
}

async function fetchTokenData(hash: string): Promise<ApiResponse> {
	const url = `https://api.cardanoscan.io/api/v1/asset/list/byAddress?address=${hash}&pageNo=1&limit=20`;
	const response = await fetch(url, {
		headers: { apiKey: API_KEY },
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.statusText}`);
	}

	return response.json();
}

function getTokenBalances(data: ApiResponse): TokenBalances {
	const balances: TokenBalances = {};

	for (const [key, assetId] of Object.entries(assetIds)) {
		const token = data.tokens.find((token) => token.assetId === assetId);
		balances[key] = token ? Number(token.balance) / 1 : 0;
	}

	return balances;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		const wallets = await Promise.all(
			HASHES.map((hash) => fetchTokenData(hash)),
		);

		const info = wallets.map(getTokenBalances);

		res.status(200).json({ info: { cbtcBalance: info[0].cbtc } });
	} catch (error) {
		console.error("Error fetching community vault data:", error);
		res.status(500).json({ message: "Server error" });
	}
}
