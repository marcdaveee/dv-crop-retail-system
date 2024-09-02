export interface ITransaction {
  id?: number | string;
  date: string;
  customer?: string;
  supplier?: string;
  supplierId?: number | string;
  customerId?: number | string;
  netWeight: number;
  moisture: number;
  meterKgs: number;
  netResecada: number;
  pricePerKg: number;
  amount: number;
  noOfSacks: number;
  expenses: number;
  type: string;
}

export interface IIncomingTransaction {
  id?: number | string;
  date: string;
  supplier: string;
  supplierId: number | string;
  netWeight: number;
  moisture: number;
  meterKgs: number;
  netResecada: number;
  pricePerKg: number;
  amount: number;
  noOfSacks: number;
  expenses: number;
  type: string;
}

export interface IOutgoingTransaction {
  id?: number | string;
  date: string;
  customer: string;
  customerId: number | string;
  netWeight: number;
  moisture: number;
  meterKgs: number;
  netResecada: number;
  pricePerKg: number;
  amount: number;
  noOfSacks: number;
  expenses: number;
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
