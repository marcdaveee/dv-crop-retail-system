export interface ITransaction {
  id?: number | string;
  date: string;
  supplier: string;
  netWeight: number;
  moisture: number;
  meterKgs: number;
  netResecada: number;
  pricePerKg: number;
  amount: number;
  noOfSacks: number;
  type: string;
}

// export interface ITransactionPerMonth {
//   month: string | null;
//   transactionPerWeek: ITransaction[][];
// }

export interface ITransactionPerMonth {
  month: string | null;
  transactionPerWeek: ITransactionPerWeek[];
}

export interface ITransactionPerWeek {
  week: number;
  transactions: ITransaction[];
}

export interface IGroupedTransaction {
  transactionPerMonth: ITransactionPerMonth[];
}
