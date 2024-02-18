export enum CardanoNetwork {
  Mainnet = "Mainnet",
  Preprod = "Preprod",
  Preview = "Preview",
}

export const BLOCKFROST_URL: Record<CardanoNetwork, string> = {
  [CardanoNetwork.Mainnet]: "https://cardano-mainnet.blockfrost.io/api/v0",
  [CardanoNetwork.Preprod]: "https://cardano-preprod.blockfrost.io/api/v0",
  [CardanoNetwork.Preview]: "https://cardano-preview.blockfrost.io/api/v0",
};

export function isValidNetwork(network: string): network is CardanoNetwork {
  switch (network) {
    case CardanoNetwork.Mainnet:
    case CardanoNetwork.Preprod:
    case CardanoNetwork.Preview:
      return true;
    default:
      return false;
  }
}
