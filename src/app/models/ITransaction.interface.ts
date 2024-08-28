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
