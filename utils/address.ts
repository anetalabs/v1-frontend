import { CardanoNetwork } from "./api";

export function shortenAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(address.length - 5);
}

export function doesAddressMatchNetwork(
  address: string,
  network: CardanoNetwork
) {
  if (address.includes("addr1")) {
    if (network === CardanoNetwork.Mainnet) {
      return true;
    }
  } else if (address.includes("addr_")) {
    if (network === CardanoNetwork.Mainnet) {
      return false;
    }
    return true;
  }
  return false;
}
