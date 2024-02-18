export interface BlockfrostAssets {
    asset: string;
    asset_name: string;
    fingerprint: string;
    initial_mint_tx_hash: string;
    metadata: {
      name: string;
      description: string;
      logo: string;
      decimals: number;
      ticker: string;
      url: string;
    };
    mint_or_burn_count: number;
    quantity: string;
    policy_id: string;
}

interface Amount {
  unit: string;
  quantity: string;
}

export interface Utxo {
  address: string;
  tx_hash: string;
  tx_index: number;
  output_index: number;
  amount: Amount[];
  block: string;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
}
