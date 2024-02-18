export default interface Transactions {
  createdAt: string;
  Btc: {
    amount: string;
    id: string;
  };
  eBtc: {
    amount: string;
    id: string;
  };
  bridgeFee: {
    amount: string;
    id: string;
  };
  id: string;
  status: string;
}
