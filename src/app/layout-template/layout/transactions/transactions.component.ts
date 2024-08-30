import { Component } from '@angular/core';

import {
  IGroupedTransaction,
  ITransaction,
} from '../../../models/ITransaction.interface';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactionList: ITransaction[] = [];
  isLoading = true;
  errorMessage = '';
  groupedTransactions: IGroupedTransaction = { transactionPerMonth: [] };

  constructor(private _transactionService: TransactionService) {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        this.transactionList = res;
        this.groupedTransactions =
          this._transactionService.groupTransactionByMonth(
            this.transactionList
          );
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Failed to load data.';
        this.isLoading = false;
      },
    });
  }

  getTotalCapital(transactions: ITransaction[]) {
    let total = 0;
    transactions.forEach((t) => {
      if (t.type === 'incoming') {
        total += t.amount;
      }
    });
    return total;
  }

  getTotalRevenues(transaction: ITransaction[]) {
    let total = 0;
    transaction.forEach((t) => {
      if (t.type === 'outgoing') {
        total += t.amount;
      }
    });
    return total;
  }

  getReturnOfInvestment(transactions: ITransaction[]) {
    let returnOfInvestment = 0;
    const revenue = this.getTotalRevenues(transactions);
    const capital = this.getTotalCapital(transactions);

    returnOfInvestment = revenue - capital;
    return returnOfInvestment;
  }
}
